package com.example.bookings;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.bookings.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	@Query("select b from Booking b where :from < b.bookedTo and :to > b.bookedFrom and b.active = true")
	public List<Booking> findOverlapping(Date from, Date to);

	@Query("select b from Booking b where :from < b.bookedTo and :to > b.bookedFrom and b.active = true and b.id != :id")
	public List<Booking> findOverlapping(long id, Date from, Date to);

	@Query("select b.id from Booking b")
	public List<Long> findAllIds();
}
