import {useState } from "react";

export default function BookingForm ({availableTimes, onDateChange, onSubmit}) {
    const [formData, setFormData] = useState(
        {
            date: '',
            time: '17:00',
            guests: 1,
            occasion: ''
        }
    );
    const resetForm = () => {
        setFormData(
            {
                date: '',
                time: '17:00',
                guests: 1,
                occasion: ''
            }
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submitting')
        alert(`submitted for date: ${formData.date}`);
        onSubmit(formData);
        resetForm();
    };

    const handleChange = (e) => {
        if(e.target.type === "date") {
            onDateChange(e.target.value);
        } else {
            setFormData(
                {
                    ...formData,
                    [e.target.id]: e.target.value
                }
            );
        }
    };
    return(
        <>
            <h1>Book your table</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Choose date</label>
                <input type="date" id="date" value={formData.date} onChange={handleChange} required/>
                <label htmlFor="time">Choose time</label>
                <select id="time" value={formData.time} onChange={handleChange} required>
                    {
                        availableTimes.map((time, index)=> (
                            <option key={index} value={time}>{time}</option>
                        ))
                    }
                </select>
                    <label htmlFor="guests">Number of guests</label>
                    <input type="number" placeholder="1" min="1" max="10" id="guests" value={formData.guests} onChange={handleChange} required/>
                        <label htmlFor="occasion">Occasion</label>
                        <select id="occasion" value={formData.occasion} onChange={handleChange}>
                            <option value={'Not specified'}>None specified</option>
                            <option value={'Birthday'}>Birthday</option>
                            <option value={'Anniversary'}>Anniversary</option>
                        </select>
                        <input type="submit" value="Make Your reservation"/>
            </form>
        </>
    );
};