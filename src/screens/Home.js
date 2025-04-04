import '../App.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import Details from '../components/Details';
import Cards from '../components/Cards';

function Home() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Hero></Hero>
      <Details></Details>
      <Reviews></Reviews>
      <Footer></Footer>
      <Cards text="Details about the food will come here" name="Name"></Cards>
    </div>
  );
}

export default Home;
