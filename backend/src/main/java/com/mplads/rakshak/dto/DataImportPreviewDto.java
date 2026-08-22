package com.mplads.rakshak.dto;

import java.util.List;
import java.util.Map;

public class DataImportPreviewDto {
    private String tempFileId;
    private String fileName;
    private int totalRows;
    private List<String> detectedHeaders;
    private List<Map<String, String>> sampleRows;
    private Map<String, String> suggestedColumnMappings;
    private List<String> systemFields;

    public DataImportPreviewDto() {}

    public String getTempFileId() { return tempFileId; }
    public void setTempFileId(String tempFileId) { this.tempFileId = tempFileId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public int getTotalRows() { return totalRows; }
    public void setTotalRows(int totalRows) { this.totalRows = totalRows; }

    public List<String> getDetectedHeaders() { return detectedHeaders; }
    public void setDetectedHeaders(List<String> detectedHeaders) { this.detectedHeaders = detectedHeaders; }

    public List<Map<String, String>> getSampleRows() { return sampleRows; }
    public void setSampleRows(List<Map<String, String>> sampleRows) { this.sampleRows = sampleRows; }

    public Map<String, String> getSuggestedColumnMappings() { return suggestedColumnMappings; }
    public void setSuggestedColumnMappings(Map<String, String> suggestedColumnMappings) { this.suggestedColumnMappings = suggestedColumnMappings; }

    public List<String> getSystemFields() { return systemFields; }
    public void setSystemFields(List<String> systemFields) { this.systemFields = systemFields; }
}
