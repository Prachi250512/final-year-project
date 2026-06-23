package com.sidhivinayak.bhakti_hub.controller;

import com.sidhivinayak.bhakti_hub.entity.Order;
import com.sidhivinayak.bhakti_hub.entity.OrderItem;
import com.sidhivinayak.bhakti_hub.entity.Product;
import com.sidhivinayak.bhakti_hub.repository.OrderRepository;
import com.sidhivinayak.bhakti_hub.repository.ProductRepository;
import com.sidhivinayak.bhakti_hub.dto.OrderRequest;
import com.sidhivinayak.bhakti_hub.dto.OrderItemRequest;
import java.util.ArrayList;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderController(OrderRepository orderRepository,
                           ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @PostMapping
    public Order createOrder(@RequestBody OrderRequest request,
                            Authentication authentication) {

        String username = authentication.getName();

        Order order = new Order();
        order.setUsername(username);
        order.setOrderDate(LocalDateTime.now());

        double total = 0;

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());

            total += product.getPrice() * itemRequest.getQuantity();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    @GetMapping("/my-orders")
    public List<Order> getUserOrders(Authentication authentication) {
        String username = authentication.getName();
        return orderRepository.findByUsername(username);
    }
}