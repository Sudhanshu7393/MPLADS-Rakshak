package com.mplads.rakshak.controller;

import com.mplads.rakshak.dto.ColumnMappingRequest;
import com.mplads.rakshak.dto.DataImportPreviewDto;
import com.mplads.rakshak.model.DataImport;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.repository.DataImportRepository;
import com.mplads.rakshak.repository.WorkRepository;
import com.mplads.rakshak.service.DataIngestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class DataImportController {

    private final DataIngestionService dataIngestionService;
    private final DataImportRepository dataImportRepository;
    private final WorkRepository workRepository;

    public DataImportController(
            DataIngestionService dataIngestionService,
            DataImportRepository dataImportRepository,
            WorkRepository workRepository) {
        this.dataIngestionService = dataIngestionService;
        this.dataImportRepository = dataImportRepository;
        this.workRepository = workRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<DataImportPreviewDto> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(dataIngestionService.previewUploadedFile(file));
    }

    @PostMapping("/ingest")
    public ResponseEntity<DataImport> ingestData(
            @RequestBody ColumnMappingRequest request,
            @AuthenticationPrincipal User user) throws IOException {
        String email = user != null ? user.getEmail() : "officer@mplads.gov.in";
        return ResponseEntity.ok(dataIngestionService.ingestWithMapping(
                request.getTempFileId(),
                request.getTempFileId(),
                request.getSourceType(),
                request.getColumnMappings(),
                email
        ));
    }

    @PostMapping("/load-demo")
    public ResponseEntity<DataImport> loadDemoData(@AuthenticationPrincipal User user) throws IOException {
        String email = user != null ? user.getEmail() : "demo.officer@mplads.gov.in";
        return ResponseEntity.ok(dataIngestionService.loadDemoDataset(email));
    }

    @GetMapping("/history")
    public ResponseEntity<List<DataImport>> getImportHistory() {
        return ResponseEntity.ok(dataImportRepository.findAllByOrderByImportedAtDesc());
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getDataStatus() {
        Map<String, Object> status = new HashMap<>();
        long totalWorks = workRepository.countTotalWorks();
        status.put("totalRecords", totalWorks);

        List<DataImport> imports = dataImportRepository.findAllByOrderByImportedAtDesc();
        if (!imports.isEmpty()) {
            DataImport latest = imports.get(0);
            status.put("activeSourceType", latest.getSourceType());
            status.put("validRecords", latest.getValidRecords());
            status.put("warningRecords", latest.getWarningRecords());
            status.put("invalidRecords", latest.getInvalidRecords());
            status.put("duplicateRecords", latest.getDuplicateRecords());
            status.put("missingCoordinates", latest.getMissingCoordinatesCount());
            status.put("lastImportTime", latest.getImportedAt());
            status.put("lastImportFile", latest.getFileName());
        } else {
            status.put("activeSourceType", totalWorks > 0 ? "DEMO/SYNTHETIC DATA" : "NO DATA");
            status.put("validRecords", totalWorks);
            status.put("warningRecords", 0);
            status.put("invalidRecords", 0);
            status.put("duplicateRecords", 0);
            status.put("missingCoordinates", 0);
            status.put("lastImportTime", null);
            status.put("lastImportFile", "None");
        }

        return ResponseEntity.ok(status);
    }
}
