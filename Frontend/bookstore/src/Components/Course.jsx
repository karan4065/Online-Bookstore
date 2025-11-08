import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:3000/book/get");
        console.log(res.data);
        setBook(res.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container pt-6 mx-auto px-2 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mt-16 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Explore Our Curated Collection
          </h1>
          <p className="mt-3 text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find your Book & Gain Knowledge From below Store.
          </p>
          
        </div>

        {/* Book cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {book?.map((item) => (
            <Cards item={item} key={item._id} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Course;
