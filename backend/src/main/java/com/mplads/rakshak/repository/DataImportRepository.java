package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.DataImport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DataImportRepository extends JpaRepository<DataImport, Long> {
    List<DataImport> findAllByOrderByImportedAtDesc();
}
