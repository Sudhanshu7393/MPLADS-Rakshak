package com.mplads.rakshak.dto;

public class MissingEvidenceActionDto {
    private String evidenceId;
    private String actionType; // REQUEST_EVIDENCE, MARK_AS_EXPLAINED
    private String officerNote;

    public MissingEvidenceActionDto() {}

    public String getEvidenceId() { return evidenceId; }
    public void setEvidenceId(String evidenceId) { this.evidenceId = evidenceId; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getOfficerNote() { return officerNote; }
    public void setOfficerNote(String officerNote) { this.officerNote = officerNote; }
}
