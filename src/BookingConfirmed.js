import { useLocation } from "react-router";

export default function BookingConfirmed () {
    const location = useLocation();
    const formData = location.state;
    return(
        <>
        {formData ?
        <table>
        <caption>Your booking summary</caption>
        <tbody>
        <tr><th scope='row'>Date:</th><td><p>{formData.date.toDateString()}</p></td></tr>
        <tr><th scope='row'>Time:</th><td><p>{formData.time}</p></td></tr>
        <tr><th scope='row'>Guests:</th><td><p>{formData.guests}</p></td></tr>
        <tr><th scope='row'>Occasion:</th><td><p>{formData.occasion}</p></td></tr>
        </tbody>
        </table>:<p>No data available</p>}
        </>
    );
}