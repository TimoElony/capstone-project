import foodpic from "./restauranfood.jpg"
import './App.css'

export default function HeroSection() {
    return(
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
    );
}