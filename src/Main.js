import './App.css'
import foodpic from "./restauranfood.jpg"

function Main () {
    return(
        <>
        <section className='HeroSection'>
                <div className='heroLeft'>
                <h1>Little Lemon</h1>
                <p>Chicago</p>
                <p>We are a family-owned little restaurant in downtown, Chicago. With an emphasis on local fresh produce and a mediterranean influence we offer the best quality.</p>
                </div>
                <div className='heroRight'>
                    <img src={foodpic} alt='Our bruschetta dish'/>
                </div>
        </section>
        <section className='WeeksSpecial'>
                <h1>This week's specials</h1>
                <div className='Repeater'>
                <article>
                    <h2>Greek salad</h2>
                </article>
                <article>
                    <h2>Greek salad</h2>
                </article>
                <article>
                    <h2>Greek salad</h2>
                </article>
                </div>
        </section>
        </>
    )
}

export default Main;