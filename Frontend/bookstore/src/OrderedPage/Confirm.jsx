import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Neworder from '../Components/Neworder';

const Confirm = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <Neworder />
      </div>

      <Footer />
    </div>
  );
};

export default Confirm;
