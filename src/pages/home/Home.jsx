import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import Navbar from './Navbar';
import MarketPlace from './MarketPlace';
import Footer from './Footer';
const Home = () => {
  return (
   <div    className="main-container my-7 overflow-x-hidden"
   style={{ minHeight: "100vh" }} >
    <Navbar/>
<Hero/>
<MarketPlace/>
<Footer/>
   </div>
   )
};

export default Home;
