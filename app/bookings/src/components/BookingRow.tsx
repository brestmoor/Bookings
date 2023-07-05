import React, {useState} from 'react';
import DatePicker from "@/components/DatePicker.tsx";

export type BookingInputData = {
    bookedFrom: Date | undefined
    bookedTo: Date | undefined
    active: boolean
}

export type Booking = BookingInputData & {id: number}


type BookingProps = {
    booking: BookingInputData,
    onDelete: (() => void) | undefined,
    onSave: (input: BookingInputData) => void
    withCancelOption: boolean
};

function BookingRow({booking, onDelete, onSave, withCancelOption}: BookingProps) {
    const [bookedFrom, setBookedFrom] = useState(booking.bookedFrom)
    const [bookedTo, setBookedTo] = useState(booking.bookedTo)
    const [active, setActive] = useState(booking.active)

    return (
        <div className="flex flex-row gap-3 items-center">
            <div>
                <span>From: </span>
                <DatePicker date={bookedFrom} setDate={setBookedFrom}/>
            </div>
            <div>
                <span>To: </span>
                <DatePicker date={bookedTo} setDate={setBookedTo}/>
            </div>
            {withCancelOption && <div className="flex flex-row">
                <span>{active ? 'Active' : 'Cancelled'}</span>
            </div>}
            {withCancelOption && <div>
                <button className="p-1" onClick={() => setActive(!active)}>{active ? 'Cancel' : 'Rebook'}</button>
            </div>}
            {onDelete && <div>
                <button className="p-1" onClick={onDelete}>Delete</button>
            </div>}
            <div>
                <button className="p-1" onClick={() => onSave({bookedFrom, bookedTo, active})}>Save</button>
            </div>
        </div>
    );
}

export default BookingRow;