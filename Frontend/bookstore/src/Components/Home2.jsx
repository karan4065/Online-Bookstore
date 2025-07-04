import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Books = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const books = [
    {
      title: "The Art of Learning",
      description:
        "This book explores the journey of mastering any skill through deep learning, focus, and persistence. It provides a roadmap to self-improvement and practical strategies for consistent growth. A must-read for students and lifelong learners alike.",
      img: "/art.png",
    },
    {
      title: "Code Complete",
      description:
        "A software development classic that dives into writing clean, maintainable code. It covers best practices, design principles, and debugging techniques. Great for developers at any level seeking to write better code.",
      img: "/cc.png",

    },
    {
      title: "Atomic Habits",
      description:
        "A guide to building good habits and breaking bad ones with small daily improvements. James Clear explains how tiny changes lead to remarkable results. Perfect for anyone looking to optimize their routine and behavior.",
      img: "/atmhabit.png",

    },
    {
      title: "Deep Work",
      description:
        "Cal Newport presents a powerful argument for the importance of focused, uninterrupted work. He offers strategies to cultivate deep focus in a distracted world. Ideal for professionals and students aiming to boost productivity.",
      img: "/dw.png",

    },
  ];

  return (
    <div className="px-6 py-10 md:mt-16 md:px-20 bg-white text-gray-800 space-y-20 dark:bg-slate-900 dark:text-white">
      {books.map((book, index) => (
        <div
          key={index}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div
              className={`md:w-1/2 mb-6 md:mb-0 ${
                index % 2 !== 0 ? "md:order-2 md:pl-10" : "md:pr-10"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
              <p className="text-lg leading-relaxed">{book.description}</p>
            </div>

            <div className={`md:w-1/2 ${index % 2 !== 0 ? "md:order-1" : ""}`}>
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-[350px] object-cover rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
