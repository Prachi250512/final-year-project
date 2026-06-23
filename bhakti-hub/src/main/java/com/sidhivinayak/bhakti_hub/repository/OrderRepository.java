package com.sidhivinayak.bhakti_hub.repository;

import com.sidhivinayak.bhakti_hub.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUsername(String username);
    @Query(value = """
    SELECT 
    u.name AS customer,
    u.email,
    p.name AS product,
    oi.quantity,
    p.price,
    o.order_date
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    JOIN users u ON o.username = u.email
    ORDER BY o.order_date DESC
    """, nativeQuery = true)
    List<Object[]> getSalesReport();

    @Query(value = """
    SELECT u.name, u.email, p.name, oi.quantity, p.price, o.order_date
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    JOIN users u ON o.username = u.email
    WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY o.order_date DESC
    """, nativeQuery = true)
    List<Object[]> getWeeklyReport();

    @Query(value = """
    SELECT u.name, u.email, p.name, oi.quantity, p.price, o.order_date
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    JOIN users u ON o.username = u.email
    WHERE MONTH(o.order_date) = MONTH(CURRENT_DATE())
    AND YEAR(o.order_date) = YEAR(CURRENT_DATE())
    ORDER BY o.order_date DESC
    """, nativeQuery = true)
    List<Object[]> getMonthlyReport();

    @Query(value = """
    SELECT 
    p.name AS product,
    GROUP_CONCAT(u.name SEPARATOR ', ') AS customers
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    JOIN users u ON o.username = u.email
    GROUP BY p.name
    """, nativeQuery = true)
    List<Object[]> getProductCustomerReport();
}