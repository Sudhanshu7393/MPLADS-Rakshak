package com.mplads.rakshak.dto;

import java.util.List;
import java.util.Map;

public class DashboardSummaryDto {
    private long totalWorks;
    private long highRiskCount;
    private long mediumRiskCount;
    private long lowRiskCount;
    private Double totalSanctionedAmount;
    private Double totalExpenditureAmount;
    private long openInvestigationsCount;
    private String activeDataMode; // PUBLIC DATA, AUTHORIZED DATA, DEMO/SYNTHETIC DATA

    private Map<String, Long> riskDistribution; // High: x, Medium: y, Low: z
    private List<Map<String, Object>> topRiskDistricts; // [{district: 'Varanasi', count: 12, avgScore: 78}]
    private List<Map<String, Object>> riskByCategory;
    private List<Map<String, Object>> recentHighRiskWorks;
    private List<Map<String, Object>> monthlyRiskTrend;

    public DashboardSummaryDto() {}

    public long getTotalWorks() { return totalWorks; }
    public void setTotalWorks(long totalWorks) { this.totalWorks = totalWorks; }

    public long getHighRiskCount() { return highRiskCount; }
    public void setHighRiskCount(long highRiskCount) { this.highRiskCount = highRiskCount; }

    public long getMediumRiskCount() { return mediumRiskCount; }
    public void setMediumRiskCount(long mediumRiskCount) { this.mediumRiskCount = mediumRiskCount; }

    public long getLowRiskCount() { return lowRiskCount; }
    public void setLowRiskCount(long lowRiskCount) { this.lowRiskCount = lowRiskCount; }

    public Double getTotalSanctionedAmount() { return totalSanctionedAmount; }
    public void setTotalSanctionedAmount(Double totalSanctionedAmount) { this.totalSanctionedAmount = totalSanctionedAmount; }

    public Double getTotalExpenditureAmount() { return totalExpenditureAmount; }
    public void setTotalExpenditureAmount(Double totalExpenditureAmount) { this.totalExpenditureAmount = totalExpenditureAmount; }

    public long getOpenInvestigationsCount() { return openInvestigationsCount; }
    public void setOpenInvestigationsCount(long openInvestigationsCount) { this.openInvestigationsCount = openInvestigationsCount; }

    public String getActiveDataMode() { return activeDataMode; }
    public void setActiveDataMode(String activeDataMode) { this.activeDataMode = activeDataMode; }

    public Map<String, Long> getRiskDistribution() { return riskDistribution; }
    public void setRiskDistribution(Map<String, Long> riskDistribution) { this.riskDistribution = riskDistribution; }

    public List<Map<String, Object>> getTopRiskDistricts() { return topRiskDistricts; }
    public void setTopRiskDistricts(List<Map<String, Object>> topRiskDistricts) { this.topRiskDistricts = topRiskDistricts; }

    public List<Map<String, Object>> getRiskByCategory() { return riskByCategory; }
    public void setRiskByCategory(List<Map<String, Object>> riskByCategory) { this.riskByCategory = riskByCategory; }

    public List<Map<String, Object>> getRecentHighRiskWorks() { return recentHighRiskWorks; }
    public void setRecentHighRiskWorks(List<Map<String, Object>> recentHighRiskWorks) { this.recentHighRiskWorks = recentHighRiskWorks; }

    public List<Map<String, Object>> getMonthlyRiskTrend() { return monthlyRiskTrend; }
    public void setMonthlyRiskTrend(List<Map<String, Object>> monthlyRiskTrend) { this.monthlyRiskTrend = monthlyRiskTrend; }
}
