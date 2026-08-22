package com.mplads.rakshak.dto;

public class UpdateInvestigationDto {
    private String status; // OPEN, UNDER_REVIEW, FIELD_VERIFICATION, ESCALATED, DISMISSED, RESOLVED
    private String priority;
    private String assignedOfficer;
    private String assignedOfficerEmail;
    private String officerNote;
    private String finalOutcome;

    public UpdateInvestigationDto() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getAssignedOfficer() { return assignedOfficer; }
    public void setAssignedOfficer(String assignedOfficer) { this.assignedOfficer = assignedOfficer; }

    public String getAssignedOfficerEmail() { return assignedOfficerEmail; }
    public void setAssignedOfficerEmail(String assignedOfficerEmail) { this.assignedOfficerEmail = assignedOfficerEmail; }

    public String getOfficerNote() { return officerNote; }
    public void setOfficerNote(String officerNote) { this.officerNote = officerNote; }

    public String getFinalOutcome() { return finalOutcome; }
    public void setFinalOutcome(String finalOutcome) { this.finalOutcome = finalOutcome; }
}
