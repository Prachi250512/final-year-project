package com.sidhivinayak.bhakti_hub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.sidhivinayak.bhakti_hub.repository.OrderRepository;

@Service
public class ReportService {

    @Autowired
    OrderRepository orderRepository;

    public List<Object[]> getReport() {
        return orderRepository.getSalesReport();
    }

    public List<Object[]> getWeeklyReport() {
        return orderRepository.getWeeklyReport();
    }

    public List<Object[]> getMonthlyReport() {
        return orderRepository.getMonthlyReport();
    }

    public List<Object[]> getProductReport() {
        return orderRepository.getProductCustomerReport();
    }
}