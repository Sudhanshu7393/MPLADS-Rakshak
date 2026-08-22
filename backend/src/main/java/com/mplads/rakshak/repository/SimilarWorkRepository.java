package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.SimilarWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SimilarWorkRepository extends JpaRepository<SimilarWork, Long> {
    List<SimilarWork> findBySourceWorkIdOrderBySimilarityScoreDesc(String sourceWorkId);
    List<SimilarWork> findByTargetWorkId(String targetWorkId);
}
