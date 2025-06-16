import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

function DevFooter() {
  const linkedinUrl = "https://www.linkedin.com/in/animesh-khare-951282289/"; 
  const instagramUrl = "https://www.instagram.com/animesh_khare001"; 
  const devName = "Animesh"; 

  return (
    <footer className="py-8 mt-12 text-center text-gray-600 border-t border-gray-300">
      <p className="text-sm mb-2">
        Developed with ❤️ by {devName}
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-300"
          aria-label={`${devName}'s LinkedIn Profile`}
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition-colors duration-300"
          aria-label={`${devName}'s Instagram Profile`}
        >
          <FaInstagram size={24}/>
        </a>
      </div>
      <p className="text-xs mt-4">
        © {new Date().getFullYear()} Birthday Buddy. All rights reserved.
      </p>
    </footer>
  );
}

export default DevFooter;