import './App.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function RepeaterSection ({header, repeater}){
    return(
        <section className='RepeaterSection'>
            <div className='RepeaterTitle'>
            <h1>This week's specials</h1>
            </div>
            <div className='MenuButton'>
                <button>See the Menu</button>
            </div>
            <div className='Repeater'>
                {repeater.map((item)=>{
                    return(
                        <article>
                            <img src={item.imgsrc} alt={item.title}/>
                            <div className='CardList'>
                            <h2>{item.title}</h2>
                            <h2 style={{color: "red"}}>{item.price}</h2>
                            </div>
                            <p className='CardText'>
                                {item.description}
                            </p>
                            <a className='CardText' href='./Order'><strong>Order now </strong><FontAwesomeIcon icon={faCartShopping} /></a>
                            <br/>
                            <br/>
                        </article>
                    );
                })}
            </div>
        </section>
);}