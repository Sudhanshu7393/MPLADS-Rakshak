package com.mplads.rakshak.dto;

import java.util.Map;

public class ColumnMappingRequest {
    private String tempFileId;
    private String sourceType = "PUBLIC DATA"; // PUBLIC DATA, AUTHORIZED DATA, DEMO/SYNTHETIC DATA
    private Map<String, String> columnMappings; // Header -> SystemField

    public ColumnMappingRequest() {}

    public String getTempFileId() { return tempFileId; }
    public void setTempFileId(String tempFileId) { this.tempFileId = tempFileId; }

    public String getSourceType() { return sourceType; }
    public void setSourceType(String sourceType) { this.sourceType = sourceType; }

    public Map<String, String> getColumnMappings() { return columnMappings; }
    public void setColumnMappings(Map<String, String> columnMappings) { this.columnMappings = columnMappings; }
}
