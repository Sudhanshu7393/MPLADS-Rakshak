package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "risk_weight_settings")
public class RiskWeightSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double costWeight = 0.25;
    private Double delayWeight = 0.20;
    private Double ruleWeight = 0.20;
    private Double similarityWeight = 0.15;
    private Double agencyWeight = 0.10;
    private Double fundEvidenceWeight = 0.10;

    private Integer lowThreshold = 39;
    private Integer mediumThreshold = 69;

    private String updatedBy = "System Default";
    private LocalDateTime updatedAt;

    public RiskWeightSetting() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getCostWeight() { return costWeight; }
    public void setCostWeight(Double costWeight) { this.costWeight = costWeight; }

    public Double getDelayWeight() { return delayWeight; }
    public void setDelayWeight(Double delayWeight) { this.delayWeight = delayWeight; }

    public Double getRuleWeight() { return ruleWeight; }
    public void setRuleWeight(Double ruleWeight) { this.ruleWeight = ruleWeight; }

    public Double getSimilarityWeight() { return similarityWeight; }
    public void setSimilarityWeight(Double similarityWeight) { this.similarityWeight = similarityWeight; }

    public Double getAgencyWeight() { return agencyWeight; }
    public void setAgencyWeight(Double agencyWeight) { this.agencyWeight = agencyWeight; }

    public Double getFundEvidenceWeight() { return fundEvidenceWeight; }
    public void setFundEvidenceWeight(Double fundEvidenceWeight) { this.fundEvidenceWeight = fundEvidenceWeight; }

    public Integer getLowThreshold() { return lowThreshold; }
    public void setLowThreshold(Integer lowThreshold) { this.lowThreshold = lowThreshold; }

    public Integer getMediumThreshold() { return mediumThreshold; }
    public void setMediumThreshold(Integer mediumThreshold) { this.mediumThreshold = mediumThreshold; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
