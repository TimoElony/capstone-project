import { useEffect, useReducer } from 'react';
import './App.css';
import BookingForm from './BookingForm';
import {fetchAPI} from  './api';

function BookingPage({onSubmit}) {
    //initializes with the old times
    const [availableTimes, dispatch] = useReducer(timesReducer, initializeOldTimes());

    useEffect(()=>{
        // fetches the available times of today to start with
        async function initTimes () {
            try {
                const times = await fetchAPI(new Date());
                dispatch({
                    type: 'initialised',
                    payload: times
                })
            } catch(error) {
                console.error('intialization failed', error)
            }
        }
        initTimes();
    },[])

    async function updateTimes (date) {
        try {
            const times = await fetchAPI(new Date(date));
            dispatch({
                    type: 'date changed',
                    payload: times
            })
        } catch(error) {
            console.error('fetching didnt go through', error);
        }
    }

    return(
    <>
    <h1>Book your table</h1>
    <BookingForm availableTimes={availableTimes} onSubmit={onSubmit} onDateChange={updateTimes} />
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

