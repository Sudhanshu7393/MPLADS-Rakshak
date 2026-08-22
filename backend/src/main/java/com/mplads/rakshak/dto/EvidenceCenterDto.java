package com.mplads.rakshak.dto;

import java.util.List;

public class EvidenceCenterDto {
    private Integer totalRequired;
    private Integer totalAvailable;
    private Integer missingCount;
    private Integer warningCount;
    private Integer missingRiskPoints;
    private List<EvidenceItemDto> evidenceItems;

    public EvidenceCenterDto() {}

    public Integer getTotalRequired() { return totalRequired; }
    public void setTotalRequired(Integer totalRequired) { this.totalRequired = totalRequired; }

    public Integer getTotalAvailable() { return totalAvailable; }
    public void setTotalAvailable(Integer totalAvailable) { this.totalAvailable = totalAvailable; }

    public Integer getMissingCount() { return missingCount; }
    public void setMissingCount(Integer missingCount) { this.missingCount = missingCount; }

    public Integer getWarningCount() { return warningCount; }
    public void setWarningCount(Integer warningCount) { this.warningCount = warningCount; }

    public Integer getMissingRiskPoints() { return missingRiskPoints; }
    public void setMissingRiskPoints(Integer missingRiskPoints) { this.missingRiskPoints = missingRiskPoints; }

    public List<EvidenceItemDto> getEvidenceItems() { return evidenceItems; }
    public void setEvidenceItems(List<EvidenceItemDto> evidenceItems) { this.evidenceItems = evidenceItems; }
}
