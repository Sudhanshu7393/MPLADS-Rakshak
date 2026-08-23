package com.mplads.rakshak.dto;

import java.time.LocalDateTime;

public class CompletionEvidenceDto {
    private Long id;
    private String evidenceId;
    private String workId;
    private String photoUrl;
    private String originalFilename;
    private String fileHash;
    private Long fileSizeBytes;
    private Double capturedLatitude;
    private Double capturedLongitude;
    private Double gpsAccuracyMeters;
    private String captureSource;
    private Double registeredLatitude;
    private Double registeredLongitude;
    private Double locationDistanceMeters;
    private Boolean locationMismatch;
    private LocalDateTime capturedAt;
    private LocalDateTime uploadedAt;
    private String uploadedByUserName;
    private String uploadedByRole;
    private String verificationStatus;
    private String verifiedByUserName;
    private LocalDateTime verifiedAt;
    private String verificationNote;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEvidenceId() { return evidenceId; }
    public void setEvidenceId(String evidenceId) { this.evidenceId = evidenceId; }
    public String getWorkId() { return workId; }
    public void setWorkId(String workId) { this.workId = workId; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public String getOriginalFilename() { return originalFilename; }
    public void setOriginalFilename(String originalFilename) { this.originalFilename = originalFilename; }
    public String getFileHash() { return fileHash; }
    public void setFileHash(String fileHash) { this.fileHash = fileHash; }
    public Long getFileSizeBytes() { return fileSizeBytes; }
    public void setFileSizeBytes(Long fileSizeBytes) { this.fileSizeBytes = fileSizeBytes; }
    public Double getCapturedLatitude() { return capturedLatitude; }
    public void setCapturedLatitude(Double capturedLatitude) { this.capturedLatitude = capturedLatitude; }
    public Double getCapturedLongitude() { return capturedLongitude; }
    public void setCapturedLongitude(Double capturedLongitude) { this.capturedLongitude = capturedLongitude; }
    public Double getGpsAccuracyMeters() { return gpsAccuracyMeters; }
    public void setGpsAccuracyMeters(Double gpsAccuracyMeters) { this.gpsAccuracyMeters = gpsAccuracyMeters; }
    public String getCaptureSource() { return captureSource; }
    public void setCaptureSource(String captureSource) { this.captureSource = captureSource; }
    public Double getRegisteredLatitude() { return registeredLatitude; }
    public void setRegisteredLatitude(Double registeredLatitude) { this.registeredLatitude = registeredLatitude; }
    public Double getRegisteredLongitude() { return registeredLongitude; }
    public void setRegisteredLongitude(Double registeredLongitude) { this.registeredLongitude = registeredLongitude; }
    public Double getLocationDistanceMeters() { return locationDistanceMeters; }
    public void setLocationDistanceMeters(Double locationDistanceMeters) { this.locationDistanceMeters = locationDistanceMeters; }
    public Boolean getLocationMismatch() { return locationMismatch; }
    public void setLocationMismatch(Boolean locationMismatch) { this.locationMismatch = locationMismatch; }
    public LocalDateTime getCapturedAt() { return capturedAt; }
    public void setCapturedAt(LocalDateTime capturedAt) { this.capturedAt = capturedAt; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    public String getUploadedByUserName() { return uploadedByUserName; }
    public void setUploadedByUserName(String uploadedByUserName) { this.uploadedByUserName = uploadedByUserName; }
    public String getUploadedByRole() { return uploadedByRole; }
    public void setUploadedByRole(String uploadedByRole) { this.uploadedByRole = uploadedByRole; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public String getVerifiedByUserName() { return verifiedByUserName; }
    public void setVerifiedByUserName(String verifiedByUserName) { this.verifiedByUserName = verifiedByUserName; }
    public LocalDateTime getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; }
    public String getVerificationNote() { return verificationNote; }
    public void setVerificationNote(String verificationNote) { this.verificationNote = verificationNote; }
}
