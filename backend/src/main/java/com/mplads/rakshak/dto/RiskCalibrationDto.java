package com.mplads.rakshak.dto;

public class RiskCalibrationDto {
    private Double costWeight;
    private Double delayWeight;
    private Double ruleWeight;
    private Double similarityWeight;
    private Double agencyWeight;
    private Double fundEvidenceWeight;
    private Integer lowThreshold;
    private Integer mediumThreshold;

    public RiskCalibrationDto() {}

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
}
