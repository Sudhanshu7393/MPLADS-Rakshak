package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "agencies")
public class Agency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String agencyId;

    @Column(nullable = false)
    private String name;

    private String type; // PWD, DRDA, Zila Parishad, Private Contractor
    private String district;
    private String state;

    private Integer totalWorksCount = 0;
    private Double totalSanctionedValue = 0.0;
    private Integer flaggedWorksCount = 0;
    private Double highRiskConcentrationPct = 0.0;
    private String concentrationLabel = "NORMAL"; // NORMAL, MODERATE_CONCENTRATION, HIGH_CONCENTRATION

    @Column(length = 1000)
    private String patternNotes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Agency() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Agency(String agencyId, String name, String type, String district, String state) {
        this.agencyId = agencyId;
        this.name = name;
        this.type = type;
        this.district = district;
        this.state = state;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAgencyId() { return agencyId; }
    public void setAgencyId(String agencyId) { this.agencyId = agencyId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Integer getTotalWorksCount() { return totalWorksCount; }
    public void setTotalWorksCount(Integer totalWorksCount) { this.totalWorksCount = totalWorksCount; }

    public Double getTotalSanctionedValue() { return totalSanctionedValue; }
    public void setTotalSanctionedValue(Double totalSanctionedValue) { this.totalSanctionedValue = totalSanctionedValue; }

    public Integer getFlaggedWorksCount() { return flaggedWorksCount; }
    public void setFlaggedWorksCount(Integer flaggedWorksCount) { this.flaggedWorksCount = flaggedWorksCount; }

    public Double getHighRiskConcentrationPct() { return highRiskConcentrationPct; }
    public void setHighRiskConcentrationPct(Double highRiskConcentrationPct) { this.highRiskConcentrationPct = highRiskConcentrationPct; }

    public String getConcentrationLabel() { return concentrationLabel; }
    public void setConcentrationLabel(String concentrationLabel) { this.concentrationLabel = concentrationLabel; }

    public String getPatternNotes() { return patternNotes; }
    public void setPatternNotes(String patternNotes) { this.patternNotes = patternNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
