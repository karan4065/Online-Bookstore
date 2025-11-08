import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Freebook from '../Components/Freebook'
import Footer from '../Components/Footer'
import Home2 from '../Components/Home2'


function Homepage() {
  return (
    <>
         <Navbar/>
         <div className=''>
         <Banner/>
         <Freebook/>
         <Home2/>
         </div>
         <Footer/>
    </>
  )
}

export default Homepage