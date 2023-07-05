package com.example.bookings.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Block {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	Date blockedFrom;
	Date blockedTo;
}
