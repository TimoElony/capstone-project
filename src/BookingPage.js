import { useReducer } from 'react';
import './App.css'
import BookingForm from './BookingForm';

function BookingPage() {
    const [availableTimes, dispatch] = useReducer(timesReducer, initializeTimes());

    function updateTimes (date) {
        alert(date)
        dispatch({
            type: 'updated',
            date: date,
        });
    }

    return(
    <>
    <BookingForm availableTimes={availableTimes} onDateChange={updateTimes} />
    </>
    )
}

export default BookingPage;

export function initializeTimes () {
    return [
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
];}

export function timesReducer (times, action) {
    switch (action.type) {
        case 'updated': {
            return times;
        }
        default: {
            return times;
        }
    }
}
