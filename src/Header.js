import logo from './littleLemonLogo.svg';
import Nav from './Nav.js';

function Header() {
    return (
        <>
        <img src={logo} alt='The logo of the little Lemon restaurant' />
        <Nav/>
        </>
    );
}

export default Header;