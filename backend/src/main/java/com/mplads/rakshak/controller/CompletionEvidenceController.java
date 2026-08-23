package com.mplads.rakshak.controller;

import com.mplads.rakshak.dto.CompletionEvidenceDto;
import com.mplads.rakshak.service.CompletionEvidenceService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CompletionEvidenceController {

    private final CompletionEvidenceService evidenceService;

    public CompletionEvidenceController(CompletionEvidenceService evidenceService) {
        this.evidenceService = evidenceService;
    }

    /**
     * POST /api/works/{workId}/evidence/capture
     * Accepts multipart form with:
     *   - photo (file)
     *   - capturedLat, capturedLon, gpsAccuracy (GPS from device)
     *   - captureSource (CAMERA_LIVE | GALLERY_UPLOAD)
     *   - capturedAt (ISO datetime string)
     *   - uploaderName, uploaderRole
     */
    @PostMapping(value = "/works/{workId}/evidence/capture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> captureEvidence(
            @PathVariable String workId,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam(value = "capturedLat", required = false) Double capturedLat,
            @RequestParam(value = "capturedLon", required = false) Double capturedLon,
            @RequestParam(value = "gpsAccuracy", required = false) Double gpsAccuracy,
            @RequestParam(value = "captureSource", defaultValue = "CAMERA_LIVE") String captureSource,
            @RequestParam(value = "capturedAt", required = false) String capturedAtStr,
            @RequestParam(value = "uploaderName", defaultValue = "Officer") String uploaderName,
            @RequestParam(value = "uploaderRole", defaultValue = "ROLE_DISTRICT_OFFICER") String uploaderRole) {
        try {
            LocalDateTime capturedAt = capturedAtStr != null ? LocalDateTime.parse(capturedAtStr) : LocalDateTime.now();
            CompletionEvidenceDto result = evidenceService.captureEvidence(
                    workId, photo, capturedLat, capturedLon, gpsAccuracy,
                    captureSource, capturedAt, uploaderName, uploaderRole);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "File storage failed: " + e.getMessage()));
        }
    }

    /**
     * GET /api/works/{workId}/evidence
     * Returns all evidence records for a given work
     */
    @GetMapping("/works/{workId}/evidence")
    public ResponseEntity<List<CompletionEvidenceDto>> getEvidenceForWork(@PathVariable String workId) {
        return ResponseEntity.ok(evidenceService.getEvidenceForWork(workId));
    }

    /**
     * GET /api/evidence/{evidenceId}
     * Returns a single evidence record by UUID
     */
    @GetMapping("/evidence/{evidenceId}")
    public ResponseEntity<?> getEvidenceById(@PathVariable String evidenceId) {
        return evidenceService.getEvidenceById(evidenceId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * PATCH /api/evidence/{evidenceId}/verify
     * Officer verifies or rejects a piece of evidence
     * Body: { "status": "VERIFIED" | "REJECTED" | "UNDER_REVIEW", "note": "...", "verifierName": "...", "verifierRole": "..." }
     */
    @PatchMapping("/evidence/{evidenceId}/verify")
    public ResponseEntity<?> verifyEvidence(
            @PathVariable String evidenceId,
            @RequestBody Map<String, String> body) {
        try {
            String status = body.getOrDefault("status", "UNDER_REVIEW");
            String note = body.getOrDefault("note", "");
            String verifierName = body.getOrDefault("verifierName", "Officer");
            String verifierRole = body.getOrDefault("verifierRole", "ROLE_DISTRICT_OFFICER");
            CompletionEvidenceDto result = evidenceService.verifyEvidence(evidenceId, status, note, verifierName, verifierRole);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
