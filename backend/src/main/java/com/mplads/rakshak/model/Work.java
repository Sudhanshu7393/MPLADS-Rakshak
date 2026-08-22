package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "works", indexes = {
    @Index(name = "idx_work_district", columnList = "district"),
    @Index(name = "idx_work_category", columnList = "category"),
    @Index(name = "idx_work_status", columnList = "status"),
    @Index(name = "idx_work_id", columnList = "workId")
})
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String workId;

    private String recommendationId;
    private String mpId;
    private String mpName;

    @Column(length = 500)
    private String workName;

    private String category;
    private String subCategory;

    private String state;
    private String district;
    private String constituency;
    private String block;
    private String village;

    private Double latitude;
    private Double longitude;

    private Double recommendedAmount = 0.0;
    private Double sanctionedAmount = 0.0;
    private Double expenditureAmount = 0.0;
    private Double remainingAmount = 0.0;

    private LocalDate recommendationDate;
    private LocalDate sanctionDate;
    private LocalDate startDate;
    private LocalDate expectedCompletionDate;
    private LocalDate actualCompletionDate;

    private String status; // Ongoing, Completed, Sanctioned, Delayed
    private Double progressPercentage = 0.0;

    private String implementingAgencyId;
    private String implementingAgencyName;

    private Integer documentCount = 3;
    private Integer photoCount = 2;
    private Boolean hasCompletionCertificate = false;

    private String sourceType = "DEMO/SYNTHETIC DATA"; // PUBLIC DATA, AUTHORIZED DATA, DEMO/SYNTHETIC DATA

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Work() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWorkId() { return workId; }
    public void setWorkId(String workId) { this.workId = workId; }

    public String getRecommendationId() { return recommendationId; }
    public void setRecommendationId(String recommendationId) { this.recommendationId = recommendationId; }

    public String getMpId() { return mpId; }
    public void setMpId(String mpId) { this.mpId = mpId; }

    public String getMpName() { return mpName; }
    public void setMpName(String mpName) { this.mpName = mpName; }

    public String getWorkName() { return workName; }
    public void setWorkName(String workName) { this.workName = workName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getConstituency() { return constituency; }
    public void setConstituency(String constituency) { this.constituency = constituency; }

    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Double getRecommendedAmount() { return recommendedAmount; }
    public void setRecommendedAmount(Double recommendedAmount) { this.recommendedAmount = recommendedAmount; }

    public Double getSanctionedAmount() { return sanctionedAmount; }
    public void setSanctionedAmount(Double sanctionedAmount) { this.sanctionedAmount = sanctionedAmount; }

    public Double getExpenditureAmount() { return expenditureAmount; }
    public void setExpenditureAmount(Double expenditureAmount) { this.expenditureAmount = expenditureAmount; }

    public Double getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(Double remainingAmount) { this.remainingAmount = remainingAmount; }

    public LocalDate getRecommendationDate() { return recommendationDate; }
    public void setRecommendationDate(LocalDate recommendationDate) { this.recommendationDate = recommendationDate; }

    public LocalDate getSanctionDate() { return sanctionDate; }
    public void setSanctionDate(LocalDate sanctionDate) { this.sanctionDate = sanctionDate; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getExpectedCompletionDate() { return expectedCompletionDate; }
    public void setExpectedCompletionDate(LocalDate expectedCompletionDate) { this.expectedCompletionDate = expectedCompletionDate; }

    public LocalDate getActualCompletionDate() { return actualCompletionDate; }
    public void setActualCompletionDate(LocalDate actualCompletionDate) { this.actualCompletionDate = actualCompletionDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }

    public String getImplementingAgencyId() { return implementingAgencyId; }
    public void setImplementingAgencyId(String implementingAgencyId) { this.implementingAgencyId = implementingAgencyId; }

    public String getImplementingAgencyName() { return implementingAgencyName; }
    public void setImplementingAgencyName(String implementingAgencyName) { this.implementingAgencyName = implementingAgencyName; }

    public Integer getDocumentCount() { return documentCount; }
    public void setDocumentCount(Integer documentCount) { this.documentCount = documentCount; }

    public Integer getPhotoCount() { return photoCount; }
    public void setPhotoCount(Integer photoCount) { this.photoCount = photoCount; }

    public Boolean getHasCompletionCertificate() { return hasCompletionCertificate; }
    public void setHasCompletionCertificate(Boolean hasCompletionCertificate) { this.hasCompletionCertificate = hasCompletionCertificate; }

    public String getSourceType() { return sourceType; }
    public void setSourceType(String sourceType) { this.sourceType = sourceType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
