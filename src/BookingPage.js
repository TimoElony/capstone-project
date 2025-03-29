import { useReducer } from 'react';
import './App.css'
import BookingForm from './BookingForm';

function BookingPage() {
    const initialTimes= [
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
    ];
    const [availableTimes, dispatch] = useReducer(timesReducer, initialTimes);

    function updateTimes (date) {
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

function timesReducer (times, action) {
    switch (action.type) {
        case 'updated': {
            return times;
        }
        default: {
            return times;
        }
    }
}
