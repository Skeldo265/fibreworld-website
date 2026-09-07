import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Trades from './components/Trades.jsx';
import Mission from './components/Mission.jsx';
import Products from './components/Products.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Corrugate from './components/Corrugate.jsx';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Trades />
      <Corrugate fg="#1b2023" bg="#144e52" />
      <Mission />
      <Corrugate fg="#eeece4" bg="#1b2023" />
      <Products />
      <Services />
      <Corrugate fg="#1b2023" bg="#eeece4" />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
