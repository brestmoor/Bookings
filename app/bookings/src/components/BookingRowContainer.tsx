import React from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteBooking, getBookingById, updateBooking} from "@/api/BookingsApi.ts";
import BookingRow, {BookingInputData} from "@/components/BookingRow.tsx";
import {AxiosError} from "axios";

function BookingRowContainer({id}: {id: number}) {
    const {isLoading, isError, data} = useQuery(["getBookingById", id], () => getBookingById(id))
    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: (data: BookingInputData) => updateBooking(id, data),
        onError: (error: AxiosError<{message: string}>) => alert(error?.response?.data.message)
    })
    const deleteMutation = useMutation({
        mutationFn: () => deleteBooking(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getBookings"]}),
    })

    const onSave = (input: BookingInputData) => {
        saveMutation.mutate(input)
    }

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    return <BookingRow booking={{active: data.active, bookedFrom: new Date(data.bookedFrom), bookedTo: new Date(data.bookedTo)}}
                       onSave={onSave}
                       onDelete={() => deleteMutation.mutate()}
                       withCancelOption={true}/>
}

export default BookingRowContainer;