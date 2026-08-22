package com.mplads.rakshak.dto;

import com.mplads.rakshak.model.AuditLog;
import com.mplads.rakshak.model.InvestigationCase;
import com.mplads.rakshak.model.InvestigationNote;
import com.mplads.rakshak.model.SimilarWork;
import com.mplads.rakshak.model.Work;

import java.util.List;
import java.util.Map;

public class RiskPassportDto {
    private Work work;
    private Integer overallScore;
    private String riskLevel;
    private String priority;
    private String confidence;
    private String modelVersion;

    private Map<String, Double> subscores;
    private List<String> reasons;
    private List<Map<String, Object>> evidenceList;

    private EvidenceCenterDto evidenceCenter;
    private Map<String, Object> peerComparison;
    private Map<String, Object> timelineAnalysis;
    private List<SimilarWork> similarWorks;
    private Map<String, Object> agencyProfile;

    private InvestigationCase investigationCase;
    private List<InvestigationNote> investigationNotes;
    private List<AuditLog> auditHistory;

    public RiskPassportDto() {}

    public Work getWork() { return work; }
    public void setWork(Work work) { this.work = work; }

    public Integer getOverallScore() { return overallScore; }
    public void setOverallScore(Integer overallScore) { this.overallScore = overallScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getConfidence() { return confidence; }
    public void setConfidence(String confidence) { this.confidence = confidence; }

    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }

    public Map<String, Double> getSubscores() { return subscores; }
    public void setSubscores(Map<String, Double> subscores) { this.subscores = subscores; }

    public List<String> getReasons() { return reasons; }
    public void setReasons(List<String> reasons) { this.reasons = reasons; }

    public List<Map<String, Object>> getEvidenceList() { return evidenceList; }
    public void setEvidenceList(List<Map<String, Object>> evidenceList) { this.evidenceList = evidenceList; }

    public EvidenceCenterDto getEvidenceCenter() { return evidenceCenter; }
    public void setEvidenceCenter(EvidenceCenterDto evidenceCenter) { this.evidenceCenter = evidenceCenter; }

    public Map<String, Object> getPeerComparison() { return peerComparison; }
    public void setPeerComparison(Map<String, Object> peerComparison) { this.peerComparison = peerComparison; }

    public Map<String, Object> getTimelineAnalysis() { return timelineAnalysis; }
    public void setTimelineAnalysis(Map<String, Object> timelineAnalysis) { this.timelineAnalysis = timelineAnalysis; }

    public List<SimilarWork> getSimilarWorks() { return similarWorks; }
    public void setSimilarWorks(List<SimilarWork> similarWorks) { this.similarWorks = similarWorks; }

    public Map<String, Object> getAgencyProfile() { return agencyProfile; }
    public void setAgencyProfile(Map<String, Object> agencyProfile) { this.agencyProfile = agencyProfile; }

    public InvestigationCase getInvestigationCase() { return investigationCase; }
    public void setInvestigationCase(InvestigationCase investigationCase) { this.investigationCase = investigationCase; }

    public List<InvestigationNote> getInvestigationNotes() { return investigationNotes; }
    public void setInvestigationNotes(List<InvestigationNote> investigationNotes) { this.investigationNotes = investigationNotes; }

    public List<AuditLog> getAuditHistory() { return auditHistory; }
    public void setAuditHistory(List<AuditLog> auditHistory) { this.auditHistory = auditHistory; }
}
