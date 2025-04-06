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
        <tr><td>Date: </td><td>{formData.date.toDateString()}</td></tr>
        <tr><td>Time: </td><td>{formData.time}</td></tr>
        <tr><td>Guests: </td><td>{formData.guests}</td></tr>
        <tr><td>Occasion: </td><td>{formData.occasion}</td></tr>
        </thead>
        </table>:<p>No data available</p>}
        </>
    );
}