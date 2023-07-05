import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getBookingIds} from "@/api/BookingsApi.ts";
import BookingRowContainer from "@/components/BookingRowContainer.tsx";
import NewBooking from "@/components/NewBooking.tsx";

function Bookings() {
    const {isError, isLoading, data} = useQuery(["getBookings"], getBookingIds)

    if (isError) return <div>Error</div>
    if (isLoading) return <div>Loading</div>

    return (
        <div className="mt-20">
            <div className="mb-3 flex justify-between items-end">
                <span className="text-2xl p-1">Bookings</span>
                <NewBooking/>
            </div>
            <div className="flex flex-col gap-2">{data.map(bookingId => <BookingRowContainer key={bookingId} id={bookingId}/>)}</div>
        </div>
    );
}

export default Bookings;