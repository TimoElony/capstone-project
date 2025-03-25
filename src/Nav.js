import './App.css';

function Nav () {
    return(
        <>
        <ul>
            <li><a href='./' role='button'>Home</a></li>
            <li><a href='./About'role='button'>About</a></li>
            <li><a href='./Menu'role='button'>Menu</a></li>
            <li><a href='./Reservation'role='button'>Reservation</a></li>
            <li><a href='./Order'role='button'>Order Online</a></li>
            <li><a href='./Login'role='button'>Login</a></li>
        </ul>
        </>
    )
}

export default Nav;