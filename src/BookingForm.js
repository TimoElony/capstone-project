import {useState } from "react";


export default function BookingForm () {
    const [availableTimes, setAvailableTimes] = useState(
        [
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00'
        ]
    );
    const [formData, setFormData] = useState(
        {
            date: '',
            time: '',
            guests: '',
            occasion: ''
        }
    );
    const resetForm = () => {
        setFormData(
            {
                date: '',
                time: '',
                guests: '',
                occasion: ''
            }
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submitted');
        e.target.reset();
        resetForm();
    };

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        );
    };
    return(
        <>
            <h1>Book your table</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Choose date</label>
                <input type="date" id="date" value={formData.date} onChange={handleChange}/>
                <label htmlFor="time">Choose time</label>
                <select id="time" value={formData.time} onChange={handleChange} required>
                    {
                        availableTimes.map((time, index)=> (
                            <option key={index} value={time}>{time}</option>
                        ))
                    }
                </select>
                    <label htmlFor="guests">Number of guests</label>
                    <input type="number" placeholder="1" min="1" max="10" id="guests" value={formData.guests} onChange={handleChange}/>
                        <label htmlFor="occasion">Occasion</label>
                        <select id="occasion" value={formData.occasion} onChange={handleChange}>
                            <option value={'Birthday'}>Birthday</option>
                            <option value={'Anniversary'}>Anniversary</option>
                        </select>
                        <input type="submit" value="Make Your reservation"/>
            </form>
        </>
    );
};