import { useEffect, useReducer } from 'react';
import './App.css';
import BookingForm from './BookingForm';
import {fetchAPI} from  './api';

function BookingPage() {
    const [availableTimes, dispatch] = useReducer(timesReducer, initializeOldTimes());

    useEffect(()=>{
        dispatch({
            type: 'updated',
            payload: fetchAPI(new Date())
        })
    },[])

    function updateTimes (date) {
        dispatch({
            type: 'updated',
            payload: fetchAPI(new Date(date)),
        });
    }

    return(
    <>
    <BookingForm availableTimes={availableTimes} onDateChange={updateTimes} />
    </>
    )
}

export default BookingPage;

export function initializeOldTimes () {
    return ([
        '17:00',
        '19:00',
        '20:00'
    ]);
}


export function timesReducer (times, action) {
    switch (action.type) {
        case 'updated': {
            return action.payload;
        }
        default: {
            return times;
        }
    }
}
