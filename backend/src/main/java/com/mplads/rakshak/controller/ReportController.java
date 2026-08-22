package com.mplads.rakshak.controller;

import com.mplads.rakshak.model.User;
import com.mplads.rakshak.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/dossier/{workId}")
    public ResponseEntity<Map<String, Object>> getDossier(
            @PathVariable String workId,
            @AuthenticationPrincipal User user) {
        String officerName = user != null ? user.getFullName() + " (" + user.getEmail() + ")" : "Authorized Review Officer";
        return ResponseEntity.ok(reportService.generateInvestigationDossier(workId, officerName));
    }
}
