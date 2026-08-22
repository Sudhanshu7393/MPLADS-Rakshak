package com.mplads.rakshak.controller;

import com.mplads.rakshak.model.SimilarWork;
import com.mplads.rakshak.repository.SimilarWorkRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/similar")
public class SimilarWorkController {

    private final SimilarWorkRepository similarWorkRepository;

    public SimilarWorkController(SimilarWorkRepository similarWorkRepository) {
        this.similarWorkRepository = similarWorkRepository;
    }

    @GetMapping("/{workId}")
    public ResponseEntity<List<SimilarWork>> getSimilarWorks(@PathVariable String workId) {
        return ResponseEntity.ok(similarWorkRepository.findBySourceWorkIdOrderBySimilarityScoreDesc(workId));
    }

    @GetMapping
    public ResponseEntity<List<SimilarWork>> getAllDetectedSimilarities() {
        return ResponseEntity.ok(similarWorkRepository.findAll());
    }
}
