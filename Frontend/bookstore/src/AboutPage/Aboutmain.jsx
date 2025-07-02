import React from 'react'
import Navbar from '../Components/Navbar'
import About from '../Components/About'
import Footer from '../Components/Footer'

function Aboutmain() {
  return (
    <div>
        <Navbar/>
         <div className='mt-16 py-2'>
         <About/>
         </div>
        <Footer/>
    </div>
  )
}

export default Aboutmain