import { useEffect, useReducer } from 'react';
import './App.css';
import BookingForm from './BookingForm';
import {fetchAPI} from  './api';

function BookingPage() {
    const [availableTimes, dispatch] = useReducer(timesReducer, initializeOldTimes());

    useEffect(()=>{
        // fetches the available times of today
        async function fetchTimes () {
            const times = await fetchAPI(new Date());
            dispatch({
                type: 'initialised',
                payload: times
            })
        }
        fetchTimes();
    },[])

    function updateTimes (date) {
        async function fetchTimes () {
            const times = await fetchAPI(new Date(date));
            dispatch({
                type: 'date changed',
                payload: times
            })
        }
        fetchTimes();
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
        case 'initialised': {
            return action.payload;
        }
        case 'date changed': {
            return action.payload;
        }
        default: {
            return times;
        }
    }
}

