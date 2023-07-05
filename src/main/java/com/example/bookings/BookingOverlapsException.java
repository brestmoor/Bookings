package com.example.bookings;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Provided bookings dates overlap with an existing booking")
public class BookingOverlapsException extends RuntimeException {
}
