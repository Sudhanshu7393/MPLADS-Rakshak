package com.mplads.rakshak.dto;

public class AddNoteDto {
    private String noteText;
    private String actionType = "NOTE_ADDED";

    public AddNoteDto() {}

    public String getNoteText() { return noteText; }
    public void setNoteText(String noteText) { this.noteText = noteText; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }
}
