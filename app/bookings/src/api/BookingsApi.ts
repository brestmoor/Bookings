import axios from "axios";
import {Booking, BookingInputData} from "@/components/BookingRow.tsx";

type BookingRawData = {
    bookedFrom: string
    bookedTo: string
    active: boolean
    id: number
}

export async function getBookingIds(): Promise<number[]> {
    return (await axios.get("http://localhost:8080/bookings")).data
}

export async function getBookingById(id: number): Promise<BookingRawData> {
    return (await axios.get("http://localhost:8080/bookings/" + id)).data
}

export async function updateBooking(id: number, bookingInput: BookingInputData) {
    return axios.put("http://localhost:8080/bookings/" + id, bookingInput)
}

export async function deleteBooking(id: number) {
    return axios.delete("http://localhost:8080/bookings/" + id)
}

export async function createBooking(booking: BookingInputData) {
    return axios.post("http://localhost:8080/bookings/", booking)
}