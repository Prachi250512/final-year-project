package com.sidhivinayak.bhakti_hub.controller;

import com.sidhivinayak.bhakti_hub.entity.Order;
import com.sidhivinayak.bhakti_hub.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/revenue")
    public Double getTotalRevenue() {
        return orderRepository.findAll()
                .stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
    }
}