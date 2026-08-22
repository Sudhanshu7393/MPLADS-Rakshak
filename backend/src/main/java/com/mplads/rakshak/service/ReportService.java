package com.mplads.rakshak.service;

import com.mplads.rakshak.dto.RiskPassportDto;
import com.mplads.rakshak.model.Work;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    private final RiskEngineService riskEngineService;

    public ReportService(RiskEngineService riskEngineService) {
        this.riskEngineService = riskEngineService;
    }

    public Map<String, Object> generateInvestigationDossier(String workId, String generatedBy) {
        RiskPassportDto passport = riskEngineService.getRiskPassport(workId);
        Work work = passport.getWork();

        Map<String, Object> report = new HashMap<>();
        report.put("reportTitle", "MPLADS RAKSHAK — STATUTORY RISK & ANOMALY ASSESSMENT DOSSIER");
        report.put("referenceCode", "MPL-DOSSIER-" + workId);
        report.put("generatedAt", LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss")));
        report.put("generatedBy", generatedBy != null ? generatedBy : "Authorized Review Officer");
        report.put("disclaimer", "CONFIDENTIAL & DECISION SUPPORT: This document reflects explainable risk indicators and anomaly scores calculated from reported MPLADS data. It is intended for authorized administrative review and does not constitute a legal determination of guilt.");

        Map<String, Object> workSummary = new HashMap<>();
        workSummary.put("workId", work.getWorkId());
        workSummary.put("workName", work.getWorkName());
        workSummary.put("category", work.getCategory() != null ? work.getCategory() : "General");
        workSummary.put("subCategory", work.getSubCategory() != null ? work.getSubCategory() : "N/A");
        workSummary.put("district", work.getDistrict() != null ? work.getDistrict() : "N/A");
        workSummary.put("state", work.getState() != null ? work.getState() : "N/A");
        workSummary.put("constituency", work.getConstituency() != null ? work.getConstituency() : "N/A");
        workSummary.put("sanctionedCost", work.getSanctionedAmount());
        workSummary.put("expenditure", work.getExpenditureAmount());
        workSummary.put("status", work.getStatus());
        workSummary.put("progressPercentage", work.getProgressPercentage());
        workSummary.put("implementingAgency", work.getImplementingAgencyName() != null ? work.getImplementingAgencyName() : "Unassigned");
        report.put("workSummary", workSummary);

        Map<String, Object> riskEval = new HashMap<>();
        riskEval.put("overallScore", passport.getOverallScore());
        riskEval.put("riskLevel", passport.getRiskLevel());
        riskEval.put("priority", passport.getPriority());
        riskEval.put("confidence", passport.getConfidence());
        riskEval.put("modelVersion", passport.getModelVersion());
        riskEval.put("subscores", passport.getSubscores());
        riskEval.put("reasons", passport.getReasons());
        riskEval.put("evidenceList", passport.getEvidenceList());
        report.put("riskEvaluation", riskEval);

        report.put("evidenceCenter", passport.getEvidenceCenter());
        report.put("peerComparison", passport.getPeerComparison());
        report.put("timelineAnalysis", passport.getTimelineAnalysis());
        report.put("similarWorks", passport.getSimilarWorks());
        report.put("agencyProfile", passport.getAgencyProfile());
        report.put("investigationCase", passport.getInvestigationCase());
        report.put("investigationNotes", passport.getInvestigationNotes());
        report.put("auditHistory", passport.getAuditHistory());

        return report;
    }
}
