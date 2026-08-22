package com.mplads.rakshak.dto;

import java.time.LocalDate;
import java.util.List;

public class RiskQueueItemDto {
    private String workId;
    private String workName;
    private String category;
    private String subCategory;
    private String district;
    private String state;
    private Double sanctionedAmount;
    private Double expenditureAmount;
    private String status;
    private Double progressPercentage;
    private String implementingAgencyName;
    private Integer riskScore;
    private String riskLevel;
    private String priority;
    private String confidence;
    private String primaryReason;
    private LocalDate sanctionDate;
    private Long delayDays;
    private Boolean hasOpenInvestigation;
    private String investigationStatus;

    public RiskQueueItemDto() {}

    public String getWorkId() { return workId; }
    public void setWorkId(String workId) { this.workId = workId; }

    public String getWorkName() { return workName; }
    public void setWorkName(String workName) { this.workName = workName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Double getSanctionedAmount() { return sanctionedAmount; }
    public void setSanctionedAmount(Double sanctionedAmount) { this.sanctionedAmount = sanctionedAmount; }

    public Double getExpenditureAmount() { return expenditureAmount; }
    public void setExpenditureAmount(Double expenditureAmount) { this.expenditureAmount = expenditureAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }

    public String getImplementingAgencyName() { return implementingAgencyName; }
    public void setImplementingAgencyName(String implementingAgencyName) { this.implementingAgencyName = implementingAgencyName; }

    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getConfidence() { return confidence; }
    public void setConfidence(String confidence) { this.confidence = confidence; }

    public String getPrimaryReason() { return primaryReason; }
    public void setPrimaryReason(String primaryReason) { this.primaryReason = primaryReason; }

    public LocalDate getSanctionDate() { return sanctionDate; }
    public void setSanctionDate(LocalDate sanctionDate) { this.sanctionDate = sanctionDate; }

    public Long getDelayDays() { return delayDays; }
    public void setDelayDays(Long delayDays) { this.delayDays = delayDays; }

    public Boolean getHasOpenInvestigation() { return hasOpenInvestigation; }
    public void setHasOpenInvestigation(Boolean hasOpenInvestigation) { this.hasOpenInvestigation = hasOpenInvestigation; }

    public String getInvestigationStatus() { return investigationStatus; }
    public void setInvestigationStatus(String investigationStatus) { this.investigationStatus = investigationStatus; }
}
