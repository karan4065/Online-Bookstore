import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Books = () => {

  useEffect(() => {
    AOS.init({
      duration: 2000, 
      once: false,   
    });
  }, []);

  return (
    <div data-aos="fade-up"> 
    <div className="px-6 py-10 md:mt-16 md:px-20 bg-white text-gray-800 space-y-20 dark:bg-slate-900 dark:text-white">
      <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="200">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10">
          <h2 className="text-2xl font-bold mb-4">The Art of Learning</h2>
          <p className="text-lg leading-relaxed">
            This book explores the journey of mastering any skill through deep learning, focus, and persistence.
            It provides a roadmap to self-improvement and practical strategies for consistent growth.
            A must-read for students and lifelong learners alike.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/art.png" alt="Book 1" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
   
    <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="200">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:order-2 md:pl-10">
          <h2 className="text-2xl font-bold mb-4">Code Complete</h2>
          <p className="text-lg leading-relaxed">
            A software development classic that dives into writing clean, maintainable code.
            It covers best practices, design principles, and debugging techniques.
            Great for developers at any level seeking to write better code.
          </p>
        </div>
        <div className="md:w-1/2 md:order-1">
          <img src="/cc.png" alt="Book 2" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>

    <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="200">

      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10">
          <h2 className="text-2xl font-bold mb-4">Atomic Habits</h2>
          <p className="text-lg leading-relaxed">
            A guide to building good habits and breaking bad ones with small daily improvements.
            James Clear explains how tiny changes lead to remarkable results.
            Perfect for anyone looking to optimize their routine and behavior.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/atmhabit.png" alt="Book 3" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
 
    <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="200">

      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:order-2 md:pl-10">
          <h2 className="text-2xl font-bold mb-4">Deep Work</h2>
          <p className="text-lg leading-relaxed">
            Cal Newport presents a powerful argument for the importance of focused, uninterrupted work.
            He offers strategies to cultivate deep focus in a distracted world.
            Ideal for professionals and students aiming to boost productivity.
          </p>
        </div>
        <div className="md:w-1/2 md:order-1">
          <img src="/dw.png" alt="Book 4" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Books;
 