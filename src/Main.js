import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import BookingConfirmed from './BookingConfirmed';

function Main () {
    
    return(
    <main>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bookingConfirmed" element={<BookingConfirmed/>}/>
    </Routes>
    </main>
    );
}

export default Main;