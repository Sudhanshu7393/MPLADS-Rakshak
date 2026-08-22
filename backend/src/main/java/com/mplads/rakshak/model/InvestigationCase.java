package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "investigation_cases", indexes = {
    @Index(name = "idx_inv_case_num", columnList = "caseNumber"),
    @Index(name = "idx_inv_work_id", columnList = "workId"),
    @Index(name = "idx_inv_status", columnList = "status")
})
public class InvestigationCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String caseNumber;

    @Column(nullable = false)
    private String workId;

    private String workName;
    private String district;
    private String category;
    private Integer riskScoreAtCreation;

    private String status = "OPEN"; // OPEN, UNDER_REVIEW, FIELD_VERIFICATION, ESCALATED, DISMISSED, RESOLVED
    private String priority = "HIGH"; // CRITICAL, HIGH, MEDIUM, LOW

    private String assignedOfficer;
    private String assignedOfficerEmail;

    @Column(length = 1000)
    private String reasonForReview;

    @Column(length = 2000)
    private String finalOutcome;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;

    public InvestigationCase() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }

    public String getWorkId() { return workId; }
    public void setWorkId(String workId) { this.workId = workId; }

    public String getWorkName() { return workName; }
    public void setWorkName(String workName) { this.workName = workName; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getRiskScoreAtCreation() { return riskScoreAtCreation; }
    public void setRiskScoreAtCreation(Integer riskScoreAtCreation) { this.riskScoreAtCreation = riskScoreAtCreation; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getAssignedOfficer() { return assignedOfficer; }
    public void setAssignedOfficer(String assignedOfficer) { this.assignedOfficer = assignedOfficer; }

    public String getAssignedOfficerEmail() { return assignedOfficerEmail; }
    public void setAssignedOfficerEmail(String assignedOfficerEmail) { this.assignedOfficerEmail = assignedOfficerEmail; }

    public String getReasonForReview() { return reasonForReview; }
    public void setReasonForReview(String reasonForReview) { this.reasonForReview = reasonForReview; }

    public String getFinalOutcome() { return finalOutcome; }
    public void setFinalOutcome(String finalOutcome) { this.finalOutcome = finalOutcome; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getClosedAt() { return closedAt; }
    public void setClosedAt(LocalDateTime closedAt) { this.closedAt = closedAt; }
}
