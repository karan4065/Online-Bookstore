 import React from 'react'
 import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Homepage from './home/Homepage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Courses from './courses/Courses'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'
import Contactmain from './Contactpage/Contactmain'
import Aboutmain from './AboutPage/Aboutmain'
import Orderpage from './OrderPage/Orderpage'
import Cartmain from './CartPage/Cartmain'
import Confirm from './OrderedPage/Confirm';
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,  
      once: false,     
    });
  }, []);

  {
    const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
     document.documentElement.classList.add('dark');
} else {
      document.documentElement.classList.remove('dark');
}

  }

    const [authUser,setAuthUser  ] = useAuth();
    console.log(authUser);
  return (

    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
      <Route path='/' element = {<Homepage/>}/>
      <Route path='/course' 
      element = {authUser? <Courses/> : <Navigate to="/"/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/contact' element={<Contactmain/>}/>
      <Route path='/about' element={<Aboutmain/>}/>
       <Route path='/orders' element={< Confirm/>}/>
      <Route path='/shop' element={<Orderpage/>}/>
      <Route path='/cart' 
      element = {authUser? <Cartmain/> : <Navigate to="/"/>}/>

    </Routes>
    <Toaster/>
    </div>
    
   );
 }
 
 export default App