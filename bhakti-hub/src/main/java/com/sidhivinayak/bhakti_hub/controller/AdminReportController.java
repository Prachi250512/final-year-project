package com.sidhivinayak.bhakti_hub.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.sidhivinayak.bhakti_hub.service.ReportService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/reports")
    public List<Object[]> getReports(@RequestParam String type) {

        if (type.equals("weekly")) {
            return reportService.getWeeklyReport();
        }

        if (type.equals("monthly")) {
            return reportService.getMonthlyReport();
        }

        return reportService.getReport();
    }

    @GetMapping("/product-report")
    public List<Object[]> getProductReport() {
        return reportService.getProductReport();
    }
}