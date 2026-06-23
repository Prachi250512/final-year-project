package com.sidhivinayak.bhakti_hub.service;

import com.sidhivinayak.bhakti_hub.entity.Order;
import com.sidhivinayak.bhakti_hub.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(String username, double amount) {
        Order order = new Order(username, amount);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}