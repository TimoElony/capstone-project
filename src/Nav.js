import './App.css';
import { Link } from "react-router";


function Nav () {
    return(
        <>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href='./About'role='button'>About</a></li>
            <li><a href='./Menu'role='button'>Menu</a></li>
            <li><Link to="/booking">Reservation</Link></li>
            <li><a href='./Order'role='button'>Order Online</a></li>
            <li><a href='./Login'role='button'>Login</a></li>
        </ul>
        </>
    )
}

export default Nav;