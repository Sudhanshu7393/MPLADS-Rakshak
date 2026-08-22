package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "risk_scores", indexes = {
    @Index(name = "idx_risk_work_id", columnList = "workId"),
    @Index(name = "idx_risk_level", columnList = "riskLevel"),
    @Index(name = "idx_risk_score", columnList = "overallScore")
})
public class RiskScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String workId;

    private Integer overallScore = 0; // 0 to 100
    private String riskLevel = "LOW";  // LOW (0-39), MEDIUM (40-69), HIGH (70-100)
    private String priority = "PRIORITY_3"; // PRIORITY_1 (Urgent), PRIORITY_2 (Medium), PRIORITY_3 (Low)
    private String confidence = "HIGH"; // HIGH, MEDIUM, LOW

    private Double costScore = 0.0;
    private Double delayScore = 0.0;
    private Double ruleScore = 0.0;
    private Double similarityScore = 0.0;
    private Double agencyScore = 0.0;
    private Double evidenceScore = 0.0;
    private Double mlScore = 0.0;

    @Column(length = 500)
    private String primaryReason;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String reasonsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String evidenceJson;

    private String modelVersion = "v1.2-ensemble-rules-iforest";

    private LocalDateTime calculatedAt;

    public RiskScore() {
        this.calculatedAt = LocalDateTime.now();
    }

    public RiskScore(String workId, Integer overallScore, String riskLevel, String priority, String confidence) {
        this.workId = workId;
        this.overallScore = overallScore;
        this.riskLevel = riskLevel;
        this.priority = priority;
        this.confidence = confidence;
        this.calculatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWorkId() { return workId; }
    public void setWorkId(String workId) { this.workId = workId; }

    public Integer getOverallScore() { return overallScore; }
    public void setOverallScore(Integer overallScore) { this.overallScore = overallScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getConfidence() { return confidence; }
    public void setConfidence(String confidence) { this.confidence = confidence; }

    public Double getCostScore() { return costScore; }
    public void setCostScore(Double costScore) { this.costScore = costScore; }

    public Double getDelayScore() { return delayScore; }
    public void setDelayScore(Double delayScore) { this.delayScore = delayScore; }

    public Double getRuleScore() { return ruleScore; }
    public void setRuleScore(Double ruleScore) { this.ruleScore = ruleScore; }

    public Double getSimilarityScore() { return similarityScore; }
    public void setSimilarityScore(Double similarityScore) { this.similarityScore = similarityScore; }

    public Double getAgencyScore() { return agencyScore; }
    public void setAgencyScore(Double agencyScore) { this.agencyScore = agencyScore; }

    public Double getEvidenceScore() { return evidenceScore; }
    public void setEvidenceScore(Double evidenceScore) { this.evidenceScore = evidenceScore; }

    public Double getMlScore() { return mlScore; }
    public void setMlScore(Double mlScore) { this.mlScore = mlScore; }

    public String getPrimaryReason() { return primaryReason; }
    public void setPrimaryReason(String primaryReason) { this.primaryReason = primaryReason; }

    public String getReasonsJson() { return reasonsJson; }
    public void setReasonsJson(String reasonsJson) { this.reasonsJson = reasonsJson; }

    public String getEvidenceJson() { return evidenceJson; }
    public void setEvidenceJson(String evidenceJson) { this.evidenceJson = evidenceJson; }

    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }

    public LocalDateTime getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(LocalDateTime calculatedAt) { this.calculatedAt = calculatedAt; }
}
