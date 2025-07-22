import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import axios from "axios";
import { motion } from "framer-motion";

function Course() {
  const [book,setBook] = useState([]);
  
  useEffect(()=>{
    const getBook = async()=>{
      try {
      const res= await axios.get("https://online-bookstore-1-eblu.onrender.com/book");
        console.log(res.data)
        setBook(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getBook();
  },[])
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto px-2 md:px-20'>
      <motion.div
            initial={{opacity:0,y:-10}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.7}}
            > 
        <div className='mt-16 items-center justify-center text-center'>
            <h1 className='md:ml-0 ml-44 py-6 md:border-none  md:h-auto md:w-auto h-36 w-40 text-2xl md:text-4xl md:py-8 md:mt-25'>We're delighted to have you
             <span className='text-pink-500 
             dark:text-teal-500  font-semibold'> Here :)</span>
             </h1>
             <p className='mt-12 font-semibold text-xl md:text-xl text-gray-700 dark:text-gray-300'>
                "We’re not just delivering pages; we’re delivering possibilities.
                  Whether you're chasing knowledge or escaping into a story, your next chapter starts here.
                  Together, let's build a brighter world, one book at a time."
             </p>
            <Link to="/">
            <button type='submit' className='mt-6 bg-pink-500 dark:bg-teal-500  rounded-md text-white px-4 py-2 dark:hover:bg-teal-600  hover:bg-pink-600  duration-200'>Back</button>
            </Link>
        </div>
        <div className='mt-8 grid grid-cols-1 md:grid-cols-4 '>
            {book.map((item)=>(
                    <Cards item = {item} key={item.id}/>
                ))}
        </div>
        </motion.div>
    </div>
    </>
  )
}

export default Course