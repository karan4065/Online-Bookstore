import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "The Alchemist", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1_g8qFjAOGYlK0pHYmLY112Yrt4hZlfuKA&s" },
    { id: 2, title: "Atomic Habits", image: "https://m.media-amazon.com/images/I/61M6KzUbf7L._AC_UF1000,1000_QL80_.jpg" },
    { id: 3, title: "Rich Dad Poor Dad", image: "https://cdn.prod.website-files.com/63c5e29f1b5bc83fe0af2489/6748e94d9d8e63723235806a_66f16342912bd42752970a76_667d74b5e073485b32692b96_Rich%252520Dad%252520Poor%252520Dad.webp" }
  ]);

  return (
    <div className="min-h-screen bg-white py-10 px-5 md:px-20 dark:bg-slate-900 dark:text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:bg-slate-900 dark:text-white">About Our Bookstore</h1>
        <p className="mt-4 text-gray-600 text-lg dark:bg-slate-900 dark:text-white">
          Welcome to our bookstore, a hub of knowledge and imagination. We aim to inspire every youth by providing access 
          to a wide range of books, from self-improvement to fictional adventures.
        </p>
      </motion.div>

      <div className="mt-7 grid md:grid-cols-3 gap-6">
        {books.map((book) => (
          <motion.div 
            key={book.id} 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.5, delay: book.id * 0.2 }} 
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-all"
          >
            <img 
              src={book.image} 
              alt={book.title} 
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{book.title}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.5 }} 
        className="mt-10 bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center"
      >
        <h2 className="text-2xl font-bold">Why Our Bookstore?</h2>
        <p className="mt-3 text-lg">
          We believe books can change lives. Our store provides a vast collection that helps in self-growth, 
          knowledge enhancement, and entertainment. Reading habits among youth lead to better creativity, 
          problem-solving skills, and intellectual growth.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
