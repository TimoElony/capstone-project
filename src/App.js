import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Nav from './Nav.js';
import Main from './Main.js'




function App() {
  return (
    <div className='PageLayout'>
      <nav>
      <Header/>
      <Nav />
      </nav>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
