package com.example.bookings;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookings.model.Block;

public interface BlockRepository extends JpaRepository<Block, Long> {
}
