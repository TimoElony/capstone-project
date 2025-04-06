import { useLocation } from "react-router-dom";

export default function BookingConfirmed () {
    const location = useLocation();
    const formData = location.state;
    return(
        <>
        {formData ?
        <table>
        <caption>Your booking summary</caption>
        <thead>
        <tr><td><label htmlFor="dateOutput">Date: </label></td><td><p id='dateOutput'>{formData.date.toDateString()}</p></td></tr>
        <tr><td><label htmlFor="timeOutput">Time: </label></td><td><p id='timeOutput'>{formData.time}</p></td></tr>
        <tr><td><label htmlFor="guestsOutput">Guests: </label></td><td><p id='guestsOutput'>{formData.guests}</p></td></tr>
        <tr><td><label htmlFor="occasionOutput">Occasion: </label></td><td><p id='occasionOutput'>{formData.occasion}</p></td></tr>
        </thead>
        </table>:<p>No data available</p>}
        </>
    );
}