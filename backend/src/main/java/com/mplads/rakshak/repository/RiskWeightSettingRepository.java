package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.RiskWeightSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiskWeightSettingRepository extends JpaRepository<RiskWeightSetting, Long> {
    Optional<RiskWeightSetting> findTopByOrderByUpdatedAtDesc();
}
