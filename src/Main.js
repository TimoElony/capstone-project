import './App.css'
import foodpic from "./restauranfood.jpg"
import greeksalad from "./greeksalad.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Main () {
    return(
        <>
        <section className='HeroSection'>
                <div className='heroLeft'>
                <h1><span>Little Lemon</span></h1>
                <p>Chicago</p>
                <p>We are a family-owned little restaurant in downtown, Chicago. With an emphasis on local fresh produce and a mediterranean influence we offer the best quality.</p>
                <button>Reserve a table</button>
                </div>
                <div className='heroRight'>
                    <img src={foodpic} alt='Our bruschetta dish'/>
                </div>
        </section>
        <section className='WeeksSpecial'>
                <div className='Description'>
                <h1>This week's specials</h1>
                </div>
                <div className='MenuButton'>
                    <button>See the Menu</button>
                </div>
                <div className='Repeater'>
                <article>
                    <img src={greeksalad} alt='greek salad'/>
                    <div className='CardList'>
                        <h2>Greek salad</h2>
                        <h2 style={{color: "red"}}>$13.99</h2>
                    </div>
                    <p className='CardText'>
                        The greek salad is a tasty dish etc and it has olives and it has tomatoes and it really tastes nice btw
                    </p>
                    <a className='CardText' href='./Order'><strong>Order now </strong><FontAwesomeIcon icon={faCartShopping} /></a>
                    <br/>
                    <br/>
                </article>
                <article>
                <img src={greeksalad} alt='greek salad'/>
                    <div className='CardList'>
                        <h2>Greek salad</h2>
                        <h2 style={{color: "red"}}>$13.99</h2>
                    </div>
                    <p className='CardText'>
                        The greek salad is a tasty dish etc and it has olives and it has tomatoes and it really tastes nice btw
                    </p>
                    <a className='CardText' href='./Order'><strong>Order now </strong><FontAwesomeIcon icon={faCartShopping} /></a>
                    <br/>
                    <br/>
                </article>
                <article>
                <img src={greeksalad} alt='greek salad'/>
                    <div className='CardList'>
                        <h2>Greek salad</h2>
                        <h2 style={{color: "red"}}>$13.99</h2>
                    </div>
                    <p className='CardText'>
                        The greek salad is a tasty dish etc and it has olives and it has tomatoes and it really tastes nice btw
                    </p>
                    <a className='CardText' href='./Order'><strong>Order now </strong><FontAwesomeIcon icon={faCartShopping} /></a>
                    <br/>
                    <br/>
                </article>
                </div>
        </section>
        </>
    )
}

export default Main;