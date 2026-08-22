package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {
    Optional<Agency> findByAgencyId(String agencyId);
    Optional<Agency> findByName(String name);
    List<Agency> findAllByOrderByTotalWorksCountDesc();
}
