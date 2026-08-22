package com.mplads.rakshak.controller;

import com.mplads.rakshak.model.Work;
import com.mplads.rakshak.repository.WorkRepository;
import com.mplads.rakshak.service.WorkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/works")
public class WorkController {

    private final WorkRepository workRepository;
    private final WorkService workService;

    public WorkController(WorkRepository workRepository, WorkService workService) {
        this.workRepository = workRepository;
        this.workService = workService;
    }

    @GetMapping
    public ResponseEntity<Page<Work>> getWorks(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(workRepository.findWithFilters(district, category, status, search, pageable));
    }

    @GetMapping("/{workId}")
    public ResponseEntity<Work> getWorkById(@PathVariable String workId) {
        return workRepository.findByWorkId(workId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filters/districts")
    public ResponseEntity<List<String>> getDistricts() {
        return ResponseEntity.ok(workRepository.findDistinctDistricts());
    }

    @GetMapping("/filters/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(workRepository.findDistinctCategories());
    }

    @GetMapping("/map")
    public ResponseEntity<List<Map<String, Object>>> getMapWorks() {
        return ResponseEntity.ok(workService.getMapWorks());
    }
}
