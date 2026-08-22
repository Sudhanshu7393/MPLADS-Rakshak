package com.mplads.rakshak.dto;

public class EvidenceItemDto {
    private String id;
    private String name;
    private Boolean required;
    private String status; // AVAILABLE, PENDING_REVIEW, NOT_AVAILABLE
    private String expectedBy;
    private String whyItMatters;
    private Integer riskImpactPts;
    private String recommendedAction;

    public EvidenceItemDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Boolean getRequired() { return required; }
    public void setRequired(Boolean required) { this.required = required; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getExpectedBy() { return expectedBy; }
    public void setExpectedBy(String expectedBy) { this.expectedBy = expectedBy; }

    public String getWhyItMatters() { return whyItMatters; }
    public void setWhyItMatters(String whyItMatters) { this.whyItMatters = whyItMatters; }

    public Integer getRiskImpactPts() { return riskImpactPts; }
    public void setRiskImpactPts(Integer riskImpactPts) { this.riskImpactPts = riskImpactPts; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }
}
