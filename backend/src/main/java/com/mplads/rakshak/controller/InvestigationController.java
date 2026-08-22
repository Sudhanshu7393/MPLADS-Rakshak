package com.mplads.rakshak.controller;

import com.mplads.rakshak.dto.AddNoteDto;
import com.mplads.rakshak.dto.CreateInvestigationDto;
import com.mplads.rakshak.dto.UpdateInvestigationDto;
import com.mplads.rakshak.model.InvestigationCase;
import com.mplads.rakshak.model.InvestigationNote;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.service.InvestigationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investigations")
public class InvestigationController {

    private final InvestigationService investigationService;

    public InvestigationController(InvestigationService investigationService) {
        this.investigationService = investigationService;
    }

    @GetMapping
    public ResponseEntity<Page<InvestigationCase>> getCases(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(investigationService.getAllCasesPaged(pageable));
    }

    @PostMapping
    public ResponseEntity<InvestigationCase> createCase(
            @RequestBody CreateInvestigationDto dto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(investigationService.createCase(dto, user));
    }

    @PatchMapping("/{caseNumber}")
    public ResponseEntity<InvestigationCase> updateCase(
            @PathVariable String caseNumber,
            @RequestBody UpdateInvestigationDto dto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(investigationService.updateCase(caseNumber, dto, user));
    }

    @PostMapping("/{caseNumber}/notes")
    public ResponseEntity<InvestigationNote> addNote(
            @PathVariable String caseNumber,
            @RequestBody AddNoteDto dto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(investigationService.addNote(caseNumber, dto, user));
    }

    @GetMapping("/{caseNumber}/notes")
    public ResponseEntity<List<InvestigationNote>> getNotes(@PathVariable String caseNumber) {
        return ResponseEntity.ok(investigationService.getNotesForCase(caseNumber));
    }
}
