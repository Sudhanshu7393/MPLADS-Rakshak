package com.mplads.rakshak.controller;

import com.mplads.rakshak.dto.MissingEvidenceActionDto;
import com.mplads.rakshak.dto.RiskPassportDto;
import com.mplads.rakshak.dto.RiskQueueItemDto;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.service.InvestigationService;
import com.mplads.rakshak.service.RiskEngineService;
import com.mplads.rakshak.service.WorkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/risks")
public class RiskController {

    private final WorkService workService;
    private final RiskEngineService riskEngineService;
    private final InvestigationService investigationService;

    public RiskController(
            WorkService workService,
            RiskEngineService riskEngineService,
            InvestigationService investigationService) {
        this.workService = workService;
        this.riskEngineService = riskEngineService;
        this.investigationService = investigationService;
    }

    @GetMapping("/queue")
    public ResponseEntity<Page<RiskQueueItemDto>> getRiskQueue(
            @RequestParam(required = false) String riskLevel,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String signalType,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "score") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(workService.getRiskQueue(riskLevel, district, category, status, signalType, search, sortBy, sortDir, pageable));
    }

    @GetMapping("/passport/{workId}")
    public ResponseEntity<RiskPassportDto> getRiskPassport(@PathVariable String workId) {
        return ResponseEntity.ok(riskEngineService.getRiskPassport(workId));
    }

    @PostMapping("/run-analysis")
    public ResponseEntity<Map<String, String>> triggerAnalysis() {
        riskEngineService.runFullAnalysis();
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Full anomaly and risk intelligence analysis completed."));
    }

    @PostMapping("/evidence-action/{workId}")
    public ResponseEntity<Map<String, String>> handleEvidenceAction(
            @PathVariable String workId,
            @RequestBody MissingEvidenceActionDto dto,
            @AuthenticationPrincipal User user) {
        investigationService.handleMissingEvidenceAction(workId, dto, user);
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Evidence action recorded in case & audit ledger."));
    }
}
