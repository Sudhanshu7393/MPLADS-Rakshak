package com.mplads.rakshak.service;

import com.mplads.rakshak.dto.AddNoteDto;
import com.mplads.rakshak.dto.CreateInvestigationDto;
import com.mplads.rakshak.dto.MissingEvidenceActionDto;
import com.mplads.rakshak.dto.UpdateInvestigationDto;
import com.mplads.rakshak.model.*;
import com.mplads.rakshak.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class InvestigationService {

    private final InvestigationCaseRepository investigationCaseRepository;
    private final InvestigationNoteRepository investigationNoteRepository;
    private final WorkRepository workRepository;
    private final RiskScoreRepository riskScoreRepository;
    private final AuditService auditService;

    public InvestigationService(
            InvestigationCaseRepository investigationCaseRepository,
            InvestigationNoteRepository investigationNoteRepository,
            WorkRepository workRepository,
            RiskScoreRepository riskScoreRepository,
            AuditService auditService) {
        this.investigationCaseRepository = investigationCaseRepository;
        this.investigationNoteRepository = investigationNoteRepository;
        this.workRepository = workRepository;
        this.riskScoreRepository = riskScoreRepository;
        this.auditService = auditService;
    }

    @Transactional
    public InvestigationCase createCase(CreateInvestigationDto dto, User user) {
        Work work = workRepository.findByWorkId(dto.getWorkId())
                .orElseThrow(() -> new NoSuchElementException("Work not found: " + dto.getWorkId()));

        RiskScore riskScore = riskScoreRepository.findByWorkId(dto.getWorkId()).orElse(null);
        int scoreVal = riskScore != null ? riskScore.getOverallScore() : 50;

        // Check if case already exists
        InvestigationCase invCase = investigationCaseRepository.findByWorkId(dto.getWorkId()).orElseGet(() -> {
            InvestigationCase c = new InvestigationCase();
            c.setCaseNumber("INV-2026-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            c.setWorkId(dto.getWorkId());
            return c;
        });

        invCase.setWorkName(work.getWorkName());
        invCase.setDistrict(work.getDistrict());
        invCase.setCategory(work.getCategory());
        invCase.setRiskScoreAtCreation(scoreVal);
        invCase.setPriority(dto.getPriority() != null ? dto.getPriority() : "HIGH");
        invCase.setStatus("OPEN");
        invCase.setReasonForReview(dto.getReasonForReview() != null ? dto.getReasonForReview() : "Flagged for officer scrutiny by intelligence layer.");
        invCase.setAssignedOfficer(user != null ? user.getFullName() : "Assigned District Officer");
        invCase.setAssignedOfficerEmail(user != null ? user.getEmail() : "district.officer@mplads.gov.in");
        invCase.setUpdatedAt(LocalDateTime.now());

        InvestigationCase saved = investigationCaseRepository.save(invCase);

        // Add Initial Note
        if (dto.getInitialNote() != null && !dto.getInitialNote().trim().isEmpty()) {
            InvestigationNote note = new InvestigationNote(
                    saved.getCaseNumber(),
                    user != null ? user.getFullName() : "Officer",
                    user != null ? user.getEmail() : "officer@mplads.gov.in",
                    user != null ? user.getRole().name() : "ROLE_DISTRICT_OFFICER",
                    dto.getInitialNote(),
                    "CASE_OPENED"
            );
            investigationNoteRepository.save(note);
        }

        auditService.logAction(
                user != null ? user.getEmail() : "system@mplads.gov.in",
                "INVESTIGATION_CREATED",
                "CASE",
                saved.getCaseNumber(),
                "Opened investigation case for work: " + work.getWorkId() + " (" + work.getWorkName() + ")"
        );

        return saved;
    }

    @Transactional
    public InvestigationCase updateCase(String caseNumber, UpdateInvestigationDto dto, User user) {
        InvestigationCase invCase = investigationCaseRepository.findByCaseNumber(caseNumber)
                .orElseThrow(() -> new NoSuchElementException("Case not found: " + caseNumber));

        String oldStatus = invCase.getStatus();
        if (dto.getStatus() != null) {
            invCase.setStatus(dto.getStatus());
            if ("RESOLVED".equalsIgnoreCase(dto.getStatus()) || "DISMISSED".equalsIgnoreCase(dto.getStatus())) {
                invCase.setClosedAt(LocalDateTime.now());
            }
        }
        if (dto.getPriority() != null) invCase.setPriority(dto.getPriority());
        if (dto.getAssignedOfficer() != null) invCase.setAssignedOfficer(dto.getAssignedOfficer());
        if (dto.getAssignedOfficerEmail() != null) invCase.setAssignedOfficerEmail(dto.getAssignedOfficerEmail());
        if (dto.getFinalOutcome() != null) invCase.setFinalOutcome(dto.getFinalOutcome());
        invCase.setUpdatedAt(LocalDateTime.now());

        InvestigationCase saved = investigationCaseRepository.save(invCase);

        if (dto.getOfficerNote() != null && !dto.getOfficerNote().trim().isEmpty()) {
            InvestigationNote note = new InvestigationNote(
                    caseNumber,
                    user != null ? user.getFullName() : "Officer",
                    user != null ? user.getEmail() : "officer@mplads.gov.in",
                    user != null ? user.getRole().name() : "ROLE_DISTRICT_OFFICER",
                    dto.getOfficerNote(),
                    oldStatus.equals(saved.getStatus()) ? "NOTE_ADDED" : "STATUS_CHANGED_" + saved.getStatus()
            );
            investigationNoteRepository.save(note);
        }

        auditService.logAction(
                user != null ? user.getEmail() : "officer@mplads.gov.in",
                "CASE_STATUS_UPDATED",
                "CASE",
                caseNumber,
                "Case status updated from [" + oldStatus + "] to [" + saved.getStatus() + "]. " +
                        (dto.getOfficerNote() != null ? "Note: " + dto.getOfficerNote() : "")
        );

        return saved;
    }

    @Transactional
    public InvestigationNote addNote(String caseNumber, AddNoteDto dto, User user) {
        InvestigationCase invCase = investigationCaseRepository.findByCaseNumber(caseNumber)
                .orElseThrow(() -> new NoSuchElementException("Case not found: " + caseNumber));

        InvestigationNote note = new InvestigationNote(
                caseNumber,
                user != null ? user.getFullName() : "Officer",
                user != null ? user.getEmail() : "officer@mplads.gov.in",
                user != null ? user.getRole().name() : "ROLE_DISTRICT_OFFICER",
                dto.getNoteText(),
                dto.getActionType() != null ? dto.getActionType() : "NOTE_ADDED"
        );

        InvestigationNote savedNote = investigationNoteRepository.save(note);

        auditService.logAction(
                user != null ? user.getEmail() : "officer@mplads.gov.in",
                "NOTE_ADDED",
                "CASE",
                caseNumber,
                "Added note: " + dto.getNoteText()
        );

        return savedNote;
    }

    @Transactional
    public void handleMissingEvidenceAction(String workId, MissingEvidenceActionDto dto, User user) {
        Work work = workRepository.findByWorkId(workId)
                .orElseThrow(() -> new NoSuchElementException("Work not found: " + workId));

        String actionDesc = "REQUEST_EVIDENCE".equalsIgnoreCase(dto.getActionType())
                ? "Dispatched formal compliance requisition for missing document [" + dto.getEvidenceId() + "] to Implementing Agency: " + work.getImplementingAgencyName()
                : "Officer marked missing evidence [" + dto.getEvidenceId() + "] as explained: " + dto.getOfficerNote();

        // Check if case exists or open one
        InvestigationCase invCase = investigationCaseRepository.findByWorkId(workId).orElseGet(() -> {
            CreateInvestigationDto cDto = new CreateInvestigationDto();
            cDto.setWorkId(workId);
            cDto.setPriority("HIGH");
            cDto.setReasonForReview("Missing mandatory compliance evidence: " + dto.getEvidenceId());
            return createCase(cDto, user);
        });

        InvestigationNote note = new InvestigationNote(
                invCase.getCaseNumber(),
                user != null ? user.getFullName() : "Officer",
                user != null ? user.getEmail() : "officer@mplads.gov.in",
                user != null ? user.getRole().name() : "ROLE_DISTRICT_OFFICER",
                actionDesc + (dto.getOfficerNote() != null ? " | Notes: " + dto.getOfficerNote() : ""),
                dto.getActionType()
        );
        investigationNoteRepository.save(note);

        auditService.logAction(
                user != null ? user.getEmail() : "officer@mplads.gov.in",
                "EVIDENCE_ACTION_" + dto.getActionType(),
                "WORK",
                workId,
                actionDesc
        );
    }

    public Page<InvestigationCase> getAllCasesPaged(Pageable pageable) {
        return investigationCaseRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public List<InvestigationNote> getNotesForCase(String caseNumber) {
        return investigationNoteRepository.findByCaseNumberOrderByCreatedAtDesc(caseNumber);
    }
}
