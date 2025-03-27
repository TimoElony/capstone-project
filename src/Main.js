import './App.css'
import greeksalad from "./greeksalad.jpg"
import HeroSection from './HeroSection';
import RepeaterSection from './RepeaterSection';

function Main () {
    return(
        <>
        <HeroSection/>
        <RepeaterSection
            //this will be on top of the Repeater
            header={{
                title: 'This weeks special',
                description: ''
            }}
            repeater={[
                {
                    title: 'Greek Salad',
                    price: '$13.99',
                    description: 'The greek salad is a tasty dish etc and it has olives and it has tomatoes and it really tastes nice btw',
                    imgsrc: greeksalad
                },
                {
                    title: 'Bolognese',
                    price: '$10.99',
                    description: 'The Bolognese is a tasty dish etc and it has olives and it has tomatoes and it really tastes nice btw',
                    imgsrc: greeksalad
                },
                {
                    title: 'Wings',
                    price: '$16.99',
                    description: 'The Wings are a tasty dish etc and it has olives and it has tomatoes and it really tastes nice btw',
                    imgsrc: greeksalad
                }]}
        />
        </>
    )
}

export default Main;