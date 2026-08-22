package com.mplads.rakshak.controller;

import com.mplads.rakshak.dto.DashboardSummaryDto;
import com.mplads.rakshak.service.WorkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final WorkService workService;

    public DashboardController(WorkService workService) {
        this.workService = workService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDto> getSummary() {
        return ResponseEntity.ok(workService.getDashboardSummary());
    }
}
