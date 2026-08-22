package com.mplads.rakshak.dto;

public class CreateInvestigationDto {
    private String workId;
    private String priority = "HIGH";
    private String reasonForReview;
    private String initialNote;

    public CreateInvestigationDto() {}

    public String getWorkId() { return workId; }
    public void setWorkId(String workId) { this.workId = workId; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getReasonForReview() { return reasonForReview; }
    public void setReasonForReview(String reasonForReview) { this.reasonForReview = reasonForReview; }

    public String getInitialNote() { return initialNote; }
    public void setInitialNote(String initialNote) { this.initialNote = initialNote; }
}
