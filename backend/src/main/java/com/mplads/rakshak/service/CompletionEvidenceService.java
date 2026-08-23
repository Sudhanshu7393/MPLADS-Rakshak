package com.mplads.rakshak.service;

import com.mplads.rakshak.dto.CompletionEvidenceDto;
import com.mplads.rakshak.model.AuditLog;
import com.mplads.rakshak.model.CompletionEvidence;
import com.mplads.rakshak.model.Work;
import com.mplads.rakshak.repository.AuditLogRepository;
import com.mplads.rakshak.repository.CompletionEvidenceRepository;
import com.mplads.rakshak.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompletionEvidenceService {

    private final CompletionEvidenceRepository evidenceRepository;
    private final WorkRepository workRepository;
    private final AuditLogRepository auditLogRepository;

    @Value("")
    private String uploadDir;

    private static final double MISMATCH_THRESHOLD_METERS = 500.0;

    public CompletionEvidenceService(
            CompletionEvidenceRepository evidenceRepository,
            WorkRepository workRepository,
            AuditLogRepository auditLogRepository) {
        this.evidenceRepository = evidenceRepository;
        this.workRepository = workRepository;
        this.auditLogRepository = auditLogRepository;
    }

    public CompletionEvidenceDto captureEvidence(
            String workId,
            MultipartFile photo,
            Double capturedLat,
            Double capturedLon,
            Double gpsAccuracy,
            String captureSource,
            LocalDateTime capturedAt,
            String uploaderName,
            String uploaderRole) throws IOException {

        // Verify work exists
        Work work = workRepository.findByWorkId(workId)
                .orElseThrow(() -> new IllegalArgumentException("Work not found: " + workId));

        // Generate unique evidence ID
        String evidenceId = UUID.randomUUID().toString();

        // Store file
        Path evidenceDir = Paths.get(uploadDir, "evidence", workId, evidenceId);
        Files.createDirectories(evidenceDir);

        String originalName = photo.getOriginalFilename() != null ? photo.getOriginalFilename() : "photo.jpg";
        String ext = originalName.contains(".") ? originalName.substring(originalName.lastIndexOf('.')) : ".jpg";
        String storedName = "evidence" + ext;
        Path filePath = evidenceDir.resolve(storedName);

        byte[] bytes = photo.getBytes();
        Files.write(filePath, bytes);

        // Compute SHA-256 hash
        String hash;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(bytes);
            hash = HexFormat.of().formatHex(hashBytes);
        } catch (Exception e) {
            hash = "hash-unavailable";
        }

        // Haversine distance (registered vs captured)
        double distMeters = 0.0;
        boolean mismatch = false;
        if (work.getLatitude() != null && work.getLongitude() != null && capturedLat != null && capturedLon != null) {
            distMeters = haversine(work.getLatitude(), work.getLongitude(), capturedLat, capturedLon);
            mismatch = distMeters > MISMATCH_THRESHOLD_METERS;
        }

        // Build entity
        CompletionEvidence ev = new CompletionEvidence();
        ev.setWorkId(workId);
        ev.setEvidenceId(evidenceId);
        ev.setPhotoUrl("/uploads/evidence/" + workId + "/" + evidenceId + "/" + storedName);
        ev.setOriginalFilename(originalName);
        ev.setFileHash(hash);
        ev.setFileSizeBytes((long) bytes.length);
        ev.setCapturedLatitude(capturedLat);
        ev.setCapturedLongitude(capturedLon);
        ev.setGpsAccuracyMeters(gpsAccuracy);
        ev.setCaptureSource(captureSource != null ? captureSource : "CAMERA_LIVE");
        ev.setRegisteredLatitude(work.getLatitude());
        ev.setRegisteredLongitude(work.getLongitude());
        ev.setLocationDistanceMeters(distMeters);
        ev.setLocationMismatch(mismatch);
        ev.setCapturedAt(capturedAt != null ? capturedAt : LocalDateTime.now());
        ev.setUploadedAt(LocalDateTime.now());
        ev.setUploadedByUserName(uploaderName);
        ev.setUploadedByRole(uploaderRole);
        ev.setVerificationStatus(mismatch ? "LOCATION_MISMATCH" : "SUBMITTED");

        ev = evidenceRepository.save(ev);

        // Audit log
        AuditLog log = new AuditLog();
        log.setAction("EVIDENCE_CAPTURED");
        log.setEntityType("COMPLETION_EVIDENCE");
        log.setEntityId(evidenceId);
        log.setUserName(uploaderName);
        log.setUserRole(uploaderRole);
        log.setDescription("Geo-verified completion evidence submitted for Work: " + workId +
                (mismatch ? " [LOCATION MISMATCH: " + Math.round(distMeters) + "m]" : " [GPS OK: " + Math.round(distMeters) + "m]"));
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);

        return toDto(ev);
    }

    public List<CompletionEvidenceDto> getEvidenceForWork(String workId) {
        return evidenceRepository.findByWorkIdOrderByUploadedAtDesc(workId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public Optional<CompletionEvidenceDto> getEvidenceById(String evidenceId) {
        return evidenceRepository.findByEvidenceId(evidenceId).map(this::toDto);
    }

    public CompletionEvidenceDto verifyEvidence(String evidenceId, String newStatus, String note,
            String verifierName, String verifierRole) {
        CompletionEvidence ev = evidenceRepository.findByEvidenceId(evidenceId)
                .orElseThrow(() -> new IllegalArgumentException("Evidence not found: " + evidenceId));
        ev.setVerificationStatus(newStatus);
        ev.setVerificationNote(note);
        ev.setVerifiedByUserName(verifierName);
        ev.setVerifiedAt(LocalDateTime.now());
        ev = evidenceRepository.save(ev);

        AuditLog log = new AuditLog();
        log.setAction("EVIDENCE_VERIFIED");
        log.setEntityType("COMPLETION_EVIDENCE");
        log.setEntityId(evidenceId);
        log.setUserName(verifierName);
        log.setUserRole(verifierRole);
        log.setDescription("Evidence " + evidenceId + " status set to " + newStatus + " for Work: " + ev.getWorkId());
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);

        return toDto(ev);
    }

    private CompletionEvidenceDto toDto(CompletionEvidence ev) {
        CompletionEvidenceDto dto = new CompletionEvidenceDto();
        dto.setId(ev.getId());
        dto.setEvidenceId(ev.getEvidenceId());
        dto.setWorkId(ev.getWorkId());
        dto.setPhotoUrl(ev.getPhotoUrl());
        dto.setOriginalFilename(ev.getOriginalFilename());
        dto.setFileHash(ev.getFileHash());
        dto.setFileSizeBytes(ev.getFileSizeBytes());
        dto.setCapturedLatitude(ev.getCapturedLatitude());
        dto.setCapturedLongitude(ev.getCapturedLongitude());
        dto.setGpsAccuracyMeters(ev.getGpsAccuracyMeters());
        dto.setCaptureSource(ev.getCaptureSource());
        dto.setRegisteredLatitude(ev.getRegisteredLatitude());
        dto.setRegisteredLongitude(ev.getRegisteredLongitude());
        dto.setLocationDistanceMeters(ev.getLocationDistanceMeters());
        dto.setLocationMismatch(ev.getLocationMismatch());
        dto.setCapturedAt(ev.getCapturedAt());
        dto.setUploadedAt(ev.getUploadedAt());
        dto.setUploadedByUserName(ev.getUploadedByUserName());
        dto.setUploadedByRole(ev.getUploadedByRole());
        dto.setVerificationStatus(ev.getVerificationStatus());
        dto.setVerifiedByUserName(ev.getVerifiedByUserName());
        dto.setVerifiedAt(ev.getVerifiedAt());
        dto.setVerificationNote(ev.getVerificationNote());
        return dto;
    }

    /** Haversine distance in meters between two lat/lon points */
    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371000;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
}
