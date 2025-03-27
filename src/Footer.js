import Nav from './Nav.js';
import logo from './littleLemonLogo.svg'

function Footer () {
    return(
        <footer>
        <img src={logo} alt='the logo'/>
        <Nav/>
        <ul>
            <li><p>Contact</p></li>
            <li><p>Timo</p></li>
            <li><p>Surname</p></li>
            <li><p>Street</p></li>
            <li><p>etc</p></li>
        </ul>
        </footer>
    )
}

export default Footer;