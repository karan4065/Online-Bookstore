import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 

const Freebook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get('https://online-bookstore-1-eblu.onrender.com/book');
        const data = res.data.filter((data) => data.category === 'Free');
        setBook(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-2 md:px-20">
      <div className="md:ml-2 my-3 ml-3 md:mt-1">
        <h1 className="text-semibold text-xl pb-2 mt-10">Free Offered Courses</h1>
        <p className="dark:text-slate-500 text-zinc-700 mt-2">
          A good bookstore feels like home for every reader — A place where stories come alive and knowledge finds you. From timeless classics to hidden gems, every corner holds a new discovery. It’s a peaceful space to explore, reflect, and grow with every page you turn.
        </p>
      </div>

      
    </div>
  );
};

export default Freebook;
