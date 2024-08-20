import React from 'react';
import { FaYoutube, FaWhatsappSquare, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white p-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-base font-semibold mb-2">Registered Office</h3>
            <p className="text-sm"><b>Head Office: 401, Rohan Tower,</b></p>
            <p className="text-sm"><b>Opp.Megamart, Old Pune-Mumbai Highway,</b></p>
            <p className="text-sm"><b>Dapodi, Pune- 411012</b></p>
            <p className="text-sm mt-4"><b>GSTIN Number: 27AATCS4445F1ZY</b></p>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-base font-semibold mb-2">About Us</h3>
            <ul className="space-y-2">
              <li className="text-sm font-semibold">
                <Link to='/'>Home</Link>
              </li>
              <li className="text-sm font-semibold">
                <Link to='/aboutUs'>About</Link>
              </li>
              <li className="text-sm font-semibold">
                <Link to='/contacts'>Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="text-base font-semibold mb-2">Business Enquiry</h3>
            <p className="text-sm"><b>For inquiries contact:</b></p>
            <p className="text-sm"><b>Email: marketing@sasengineering.in</b></p>
            <p className="text-sm"><b>Phone: 9850418036</b></p>
            <h5 className="text-sm mt-4">Connect With Us</h5>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube color='red' size={25}/>
              </a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <FaWhatsappSquare color='#25D366' size={25}/>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin color='#0A66C2' size={25}/>
              </a>
            </div>
          </div>
          
        </div>
        <div className="text-center font-semibold mt-6">
          <p style={{ backgroundColor: "#CDF0EA", color: "black" }} className="text-sm">
            Copyright 2024 &copy; SAS Engineering. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};