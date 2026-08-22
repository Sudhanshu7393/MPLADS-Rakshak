package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.InvestigationCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvestigationCaseRepository extends JpaRepository<InvestigationCase, Long> {
    Optional<InvestigationCase> findByCaseNumber(String caseNumber);
    Optional<InvestigationCase> findByWorkId(String workId);
    boolean existsByWorkId(String workId);
    List<InvestigationCase> findByStatus(String status);
    Page<InvestigationCase> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(String status);
}
