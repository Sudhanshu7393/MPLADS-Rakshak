package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.Work;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    Optional<Work> findByWorkId(String workId);
    boolean existsByWorkId(String workId);

    @Query("SELECT DISTINCT w.district FROM Work w WHERE w.district IS NOT NULL ORDER BY w.district")
    List<String> findDistinctDistricts();

    @Query("SELECT DISTINCT w.category FROM Work w WHERE w.category IS NOT NULL ORDER BY w.category")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT w.state FROM Work w WHERE w.state IS NOT NULL ORDER BY w.state")
    List<String> findDistinctStates();

    @Query("SELECT w FROM Work w WHERE " +
           "(:district IS NULL OR :district = '' OR w.district = :district) AND " +
           "(:category IS NULL OR :category = '' OR w.category = :category) AND " +
           "(:status IS NULL OR :status = '' OR w.status = :status) AND " +
           "(:search IS NULL OR :search = '' OR LOWER(w.workName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(w.workId) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Work> findWithFilters(
            @Param("district") String district,
            @Param("category") String category,
            @Param("status") String status,
            @Param("search") String search,
            Pageable pageable);

    @Query("SELECT w FROM Work w WHERE w.latitude IS NOT NULL AND w.longitude IS NOT NULL")
    List<Work> findWorksWithCoordinates();

    @Query("SELECT COUNT(w) FROM Work w")
    long countTotalWorks();

    @Query("SELECT SUM(w.sanctionedAmount) FROM Work w")
    Double sumTotalSanctionedAmount();

    @Query("SELECT SUM(w.expenditureAmount) FROM Work w")
    Double sumTotalExpenditureAmount();
}
