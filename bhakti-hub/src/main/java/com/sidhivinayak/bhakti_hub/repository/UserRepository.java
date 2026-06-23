package com.sidhivinayak.bhakti_hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sidhivinayak.bhakti_hub.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}