import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Nav from './Nav.js';

function App() {
  return (
    <div className='pageLayout'>
      <nav>
      <Header/>
      <Nav />
      </nav>
      <main>
      <Main/>
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
}

export default App;
