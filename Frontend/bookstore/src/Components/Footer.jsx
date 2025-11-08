import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-5">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-6 text-3xl p-4 bg-base-100">
          <a href="https://github.com/karan4065" id="icon1" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-gray-500 transition-colors duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/karan-jadhav-573968322/" id="icon2" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-800 transition-colors duration-300" />
          </a>
          <a href="https://twitter.com/karan_jadhav30" id="icon3" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-sky-400 transition-colors duration-300" />
          </a>
        </div>
        <p className="text-center text-md">
          &copy; {new Date().getFullYear()} - All rights reserved by <span className="font-semibold">Karan Jadhav</span> <span className="text-red-500">&hearts;</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
