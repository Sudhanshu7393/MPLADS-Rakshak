package com.mplads.rakshak.controller;

import com.mplads.rakshak.dto.RiskCalibrationDto;
import com.mplads.rakshak.model.RiskWeightSetting;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.repository.RiskWeightSettingRepository;
import com.mplads.rakshak.service.AuditService;
import com.mplads.rakshak.service.RiskEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final RiskWeightSettingRepository riskWeightSettingRepository;
    private final RiskEngineService riskEngineService;
    private final AuditService auditService;

    public SettingsController(
            RiskWeightSettingRepository riskWeightSettingRepository,
            RiskEngineService riskEngineService,
            AuditService auditService) {
        this.riskWeightSettingRepository = riskWeightSettingRepository;
        this.riskEngineService = riskEngineService;
        this.auditService = auditService;
    }

    @GetMapping("/weights")
    public ResponseEntity<RiskWeightSetting> getWeights() {
        return ResponseEntity.ok(riskWeightSettingRepository.findTopByOrderByUpdatedAtDesc()
                .orElseGet(RiskWeightSetting::new));
    }

    @PostMapping("/weights")
    public ResponseEntity<RiskWeightSetting> updateWeights(
            @RequestBody RiskCalibrationDto dto,
            @AuthenticationPrincipal User user) {

        RiskWeightSetting setting = new RiskWeightSetting();
        if (dto.getCostWeight() != null) setting.setCostWeight(dto.getCostWeight());
        if (dto.getDelayWeight() != null) setting.setDelayWeight(dto.getDelayWeight());
        if (dto.getRuleWeight() != null) setting.setRuleWeight(dto.getRuleWeight());
        if (dto.getSimilarityWeight() != null) setting.setSimilarityWeight(dto.getSimilarityWeight());
        if (dto.getAgencyWeight() != null) setting.setAgencyWeight(dto.getAgencyWeight());
        if (dto.getFundEvidenceWeight() != null) setting.setFundEvidenceWeight(dto.getFundEvidenceWeight());
        if (dto.getLowThreshold() != null) setting.setLowThreshold(dto.getLowThreshold());
        if (dto.getMediumThreshold() != null) setting.setMediumThreshold(dto.getMediumThreshold());

        String email = user != null ? user.getEmail() : "admin@mplads.gov.in";
        setting.setUpdatedBy(email);
        setting.setUpdatedAt(LocalDateTime.now());

        RiskWeightSetting saved = riskWeightSettingRepository.save(setting);

        auditService.logAction(email, "WEIGHTS_UPDATED", "SYSTEM", String.valueOf(saved.getId()),
                "Calibrated risk scoring formula weights: Cost=" + saved.getCostWeight() + ", Delay=" + saved.getDelayWeight() + ", Rules=" + saved.getRuleWeight());

        // Re-run scoring with new weights
        riskEngineService.runFullAnalysis();

        return ResponseEntity.ok(saved);
    }
}
