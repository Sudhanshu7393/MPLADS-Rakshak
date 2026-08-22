package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "similar_works", indexes = {
    @Index(name = "idx_sim_work_id", columnList = "sourceWorkId"),
    @Index(name = "idx_sim_target_id", columnList = "targetWorkId")
})
public class SimilarWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sourceWorkId;

    @Column(nullable = false)
    private String targetWorkId;

    private String targetWorkName;
    private String targetDistrict;
    private String targetCategory;
    private Double targetSanctionedAmount = 0.0;
    private String targetSanctionDate;
    private String targetAgency;

    private Double similarityScore; // 0.0 to 100.0
    private Double distanceMeters;   // Distance in meters

    @Lob
    @Column(columnDefinition = "TEXT")
    private String matchingFactorsJson;

    private LocalDateTime detectedAt;

    public SimilarWork() {
        this.detectedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSourceWorkId() { return sourceWorkId; }
    public void setSourceWorkId(String sourceWorkId) { this.sourceWorkId = sourceWorkId; }

    public String getTargetWorkId() { return targetWorkId; }
    public void setTargetWorkId(String targetWorkId) { this.targetWorkId = targetWorkId; }

    public String getTargetWorkName() { return targetWorkName; }
    public void setTargetWorkName(String targetWorkName) { this.targetWorkName = targetWorkName; }

    public String getTargetDistrict() { return targetDistrict; }
    public void setTargetDistrict(String targetDistrict) { this.targetDistrict = targetDistrict; }

    public String getTargetCategory() { return targetCategory; }
    public void setTargetCategory(String targetCategory) { this.targetCategory = targetCategory; }

    public Double getTargetSanctionedAmount() { return targetSanctionedAmount; }
    public void setTargetSanctionedAmount(Double targetSanctionedAmount) { this.targetSanctionedAmount = targetSanctionedAmount; }

    public String getTargetSanctionDate() { return targetSanctionDate; }
    public void setTargetSanctionDate(String targetSanctionDate) { this.targetSanctionDate = targetSanctionDate; }

    public String getTargetAgency() { return targetAgency; }
    public void setTargetAgency(String targetAgency) { this.targetAgency = targetAgency; }

    public Double getSimilarityScore() { return similarityScore; }
    public void setSimilarityScore(Double similarityScore) { this.similarityScore = similarityScore; }

    public Double getDistanceMeters() { return distanceMeters; }
    public void setDistanceMeters(Double distanceMeters) { this.distanceMeters = distanceMeters; }

    public String getMatchingFactorsJson() { return matchingFactorsJson; }
    public void setMatchingFactorsJson(String matchingFactorsJson) { this.matchingFactorsJson = matchingFactorsJson; }

    public LocalDateTime getDetectedAt() { return detectedAt; }
    public void setDetectedAt(LocalDateTime detectedAt) { this.detectedAt = detectedAt; }
}
