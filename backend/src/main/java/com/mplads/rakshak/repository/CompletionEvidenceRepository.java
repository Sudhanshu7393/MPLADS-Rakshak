package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.CompletionEvidence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CompletionEvidenceRepository extends JpaRepository<CompletionEvidence, Long> {
    List<CompletionEvidence> findByWorkIdOrderByUploadedAtDesc(String workId);
    Optional<CompletionEvidence> findByEvidenceId(String evidenceId);
    long countByWorkId(String workId);
    long countByVerificationStatus(String status);
}
