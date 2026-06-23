package com.sidhivinayak.bhakti_hub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

    @GetMapping("/customer")
    public String customer() {
        return "customer";
    }
}
