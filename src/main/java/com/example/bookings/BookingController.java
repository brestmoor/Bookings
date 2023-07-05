package com.example.bookings;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookings.model.Booking;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingController {

	private final BookingRepository bookingRepository;

	@GetMapping
	public List<Long> getAllIds() {
		return bookingRepository.findAllIds();
	}

	@GetMapping(path = "/{id}")
	public Booking get(@PathVariable long id) {
		return bookingRepository.findById(id).orElseThrow();
	}

	@PostMapping
	public Booking create(@RequestBody Booking booking) {
		List<Booking> overlapping = bookingRepository.findOverlapping(booking.getBookedFrom(), booking.getBookedTo());
		if (!overlapping.isEmpty()) {
			throw new BookingOverlapsException();
		}
		return bookingRepository.save(booking);
	}

	@PutMapping(path = "/{id}")
	public Booking update(@PathVariable long id, @RequestBody Booking booking) {
		List<Booking> overlapping =
				bookingRepository.findOverlapping(id, booking.getBookedFrom(), booking.getBookedTo());
		if (booking.isActive() && !overlapping.isEmpty()) {
			throw new BookingOverlapsException();
		}
		booking.setId(id);
		return bookingRepository.save(booking);
	}

	@DeleteMapping(path = "{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void create(@PathVariable long id) {
		bookingRepository.deleteById(id);
	}
}
