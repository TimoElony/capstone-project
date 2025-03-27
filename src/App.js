import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Nav from './Nav.js';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.js';
import BookingPage from './BookingPage.js';




function App() {
  return (
    <div className='PageLayout'>
      <nav>
      <Header/>
      <Nav />
      </nav>
      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
