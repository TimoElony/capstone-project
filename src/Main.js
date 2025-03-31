import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import BookingConfirmed from './BookingConfirmed';
import { submitAPI } from './api';

function Main () {
    const navigate = useNavigate();
    const submitForm = (formData) => {
        async function fetchsubmitForm (){
            const response = await submitAPI(formData);
            if(response && formData) {
                alert(`submitform successful, response ${response} ${formData}`);
                navigate('/bookingConfirmed', {state: formData});
            } else {
                alert('submitForm failed');
            }
        }
        fetchsubmitForm();
    }

    return(
    <main>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage onSubmit={submitForm} />} />
        <Route path="/bookingConfirmed" element={<BookingConfirmed />}/>
    </Routes>
    </main>
    );
}

export default Main;