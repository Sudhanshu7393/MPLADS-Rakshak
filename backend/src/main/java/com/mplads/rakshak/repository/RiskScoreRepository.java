package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.RiskScore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RiskScoreRepository extends JpaRepository<RiskScore, Long> {
    Optional<RiskScore> findByWorkId(String workId);
    List<RiskScore> findByRiskLevel(String riskLevel);

    long countByRiskLevel(String riskLevel);

    @Query("SELECT r FROM RiskScore r ORDER BY r.overallScore DESC")
    List<RiskScore> findTopHighRisks(Pageable pageable);

    @Query("SELECT r FROM RiskScore r WHERE " +
           "(:riskLevel IS NULL OR :riskLevel = '' OR r.riskLevel = :riskLevel) " +
           "ORDER BY r.overallScore DESC")
    Page<RiskScore> findByRiskLevelPaged(@Param("riskLevel") String riskLevel, Pageable pageable);
}
