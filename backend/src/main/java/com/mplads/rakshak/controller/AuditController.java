package com.mplads.rakshak.controller;

import com.mplads.rakshak.model.AuditLog;
import com.mplads.rakshak.service.AuditService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {

    private final AuditService auditService;

    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }

    @GetMapping
    public ResponseEntity<Page<AuditLog>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(auditService.getAuditLogsPaged(pageable));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<AuditLog>> getRecentLogs() {
        return ResponseEntity.ok(auditService.getRecentAuditLogs());
    }

    @GetMapping("/entity/{entityId}")
    public ResponseEntity<List<AuditLog>> getEntityLogs(@PathVariable String entityId) {
        return ResponseEntity.ok(auditService.getEntityAuditLogs(entityId));
    }
}
