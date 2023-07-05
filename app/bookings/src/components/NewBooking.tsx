import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import BookingRow, {BookingInputData} from "@/components/BookingRow.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createBooking} from "@/api/BookingsApi.ts";
import {AxiosError} from "axios";

function NewBooking() {
    const queryClient = useQueryClient()

    const newBookingMutation = useMutation({
        mutationFn: (booking: BookingInputData) => createBooking(booking),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getBookings"]}),
        onError: (error: AxiosError<{message: string}>) => alert(error?.response?.data.message)
    })
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}>
                    Add new
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white p-1">
                <BookingRow booking={{active: true, bookedTo: undefined, bookedFrom: undefined}} onDelete={undefined} onSave={newBookingMutation.mutate} withCancelOption={false}/>
            </PopoverContent>
        </Popover>
    );
}

export default NewBooking;