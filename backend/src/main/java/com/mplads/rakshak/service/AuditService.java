package com.mplads.rakshak.service;

import com.mplads.rakshak.model.AuditLog;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.repository.AuditLogRepository;
import com.mplads.rakshak.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;

    public AuditService(AuditLogRepository auditLogRepository, UserRepository userRepository) {
        this.auditLogRepository = auditLogRepository;
        this.userRepository = userRepository;
    }

    public void logAction(String userEmail, String action, String entityType, String entityId, String description) {
        User user = null;
        if (userEmail != null) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        AuditLog log = new AuditLog();
        log.setUserEmail(userEmail != null ? userEmail : "system@mplads.gov.in");
        log.setUserName(user != null ? user.getFullName() : "System / Officer");
        log.setUserRole(user != null ? user.getRole().name() : "ROLE_DISTRICT_OFFICER");
        log.setAction(action);
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setDescription(description);

        auditLogRepository.save(log);
    }

    public Page<AuditLog> getAuditLogsPaged(Pageable pageable) {
        return auditLogRepository.findAllByOrderByTimestampDesc(pageable);
    }

    public List<AuditLog> getRecentAuditLogs() {
        return auditLogRepository.findTop20ByOrderByTimestampDesc();
    }

    public List<AuditLog> getEntityAuditLogs(String entityId) {
        return auditLogRepository.findByEntityIdOrderByTimestampDesc(entityId);
    }
}
