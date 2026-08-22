package com.mplads.rakshak.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "data_imports")
public class DataImport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String sourceType = "PUBLIC DATA"; // PUBLIC DATA, AUTHORIZED DATA, DEMO/SYNTHETIC DATA
    private Integer totalRecords = 0;
    private Integer validRecords = 0;
    private Integer warningRecords = 0;
    private Integer invalidRecords = 0;
    private Integer duplicateRecords = 0;
    private Integer missingCoordinatesCount = 0;

    private String status = "COMPLETED"; // PROCESSING, COMPLETED, FAILED

    @Lob
    @Column(columnDefinition = "TEXT")
    private String validationSummaryJson;

    private String importedBy;
    private LocalDateTime importedAt;

    public DataImport() {
        this.importedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getSourceType() { return sourceType; }
    public void setSourceType(String sourceType) { this.sourceType = sourceType; }

    public Integer getTotalRecords() { return totalRecords; }
    public void setTotalRecords(Integer totalRecords) { this.totalRecords = totalRecords; }

    public Integer getValidRecords() { return validRecords; }
    public void setValidRecords(Integer validRecords) { this.validRecords = validRecords; }

    public Integer getWarningRecords() { return warningRecords; }
    public void setWarningRecords(Integer warningRecords) { this.warningRecords = warningRecords; }

    public Integer getInvalidRecords() { return invalidRecords; }
    public void setInvalidRecords(Integer invalidRecords) { this.invalidRecords = invalidRecords; }

    public Integer getDuplicateRecords() { return duplicateRecords; }
    public void setDuplicateRecords(Integer duplicateRecords) { this.duplicateRecords = duplicateRecords; }

    public Integer getMissingCoordinatesCount() { return missingCoordinatesCount; }
    public void setMissingCoordinatesCount(Integer missingCoordinatesCount) { this.missingCoordinatesCount = missingCoordinatesCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getValidationSummaryJson() { return validationSummaryJson; }
    public void setValidationSummaryJson(String validationSummaryJson) { this.validationSummaryJson = validationSummaryJson; }

    public String getImportedBy() { return importedBy; }
    public void setImportedBy(String importedBy) { this.importedBy = importedBy; }

    public LocalDateTime getImportedAt() { return importedAt; }
    public void setImportedAt(LocalDateTime importedAt) { this.importedAt = importedAt; }
}
