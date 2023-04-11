import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer"
import Main from "./Main"
import React from "react";

const Home = () => {
  return (
    <div>
         <Navbar />
          <Hero />
          <Main />
          <Footer />
      
    </div>
  );
};

export default Home;
