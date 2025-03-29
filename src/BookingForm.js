import { useState } from "react";


export default function BookingForm () {
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
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submitted');
        e.target.reset();
        resetForm();
    }

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        );
    }
    return(
        <>
            <h1>Book your table</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Choose date</label>
                <input type="date" id="date" value={formData.date} onChange={handleChange}/>
                <label htmlFor="time">Choose time</label>
                <select id="time " value={formData.time} onChange={handleChange} required>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                </select>
                    <label htmlFor="guests">Number of guests</label>
                    <input type="number" placeholder="1" min="1" max="10" id="guests" value={formData.value} onChange={handleChange}/>
                        <label htmlFor="occasion">Occasion</label>
                        <select id="occasion" value={formData.occasion} onChange={handleChange}>
                            <option>Birthday</option>
                            <option>Anniversary</option>
                        </select>
                        <input type="submit" value="Make Your reservation"/>
            </form>
        </>
    );
}