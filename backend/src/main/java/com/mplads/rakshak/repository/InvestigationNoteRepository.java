package com.mplads.rakshak.repository;

import com.mplads.rakshak.model.InvestigationNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestigationNoteRepository extends JpaRepository<InvestigationNote, Long> {
    List<InvestigationNote> findByCaseNumberOrderByCreatedAtDesc(String caseNumber);
}
