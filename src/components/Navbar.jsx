import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useProducts } from '../ProductsProvider';
import { IoIosArrowForward } from "react-icons/io";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from 'axios';

export const Navbar = ({ handleContactClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Updated state name for clarity
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [dropdownProducts, setDropdownProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { cartItems, getTotalItemCount } = useCart();
  const { categories } = useProducts();
  const totalItemCount = getTotalItemCount();

  const handleContactButtonClick = () => {
    const descriptions = cartItems.map(item => item.description);
    handleContactClick(descriptions);
  };

  const fetchProducts = async (categoryName) => {
    try {
      const response = await axios.get(`https://ecombackend1-git-main-nileshs-projects-68bb2634.vercel.app/products/${encodeURIComponent(categoryName)}`);
      setDropdownProducts(response.data);
      console.log("response is", response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    if (categoryName) {
      navigate(`/subcategory/${encodeURIComponent(categoryName)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className='w-[100vw] h-[13vh] md:h-[14vh] lg:h-[15vh] flex justify-between bg-slate-200 '>
        <div className='w-40 md:w-52 lg:w-[20vw] h-[13vh] md:h-[14vh] lg:h-[15vh] flex flex-col justify-center items-center'>
          <h1 className='text-[.9rem] md:text-md lg:text-3xl text-center md:text-lg'>SAS TECHNOLOGY</h1>
          <h4 className='text-[.6rem] md:text-[.8rem] lg:text-[1rem]' style={{ lineHeight: '.9rem' }}>INDUSTRIAL MART</h4>
        </div>

        {/* Hamburger menu */}
        <div className='w-[20vw] md:hidden flex justify-center items-center'>
          <FaBars className='text-3xl' onClick={toggleSidebar} />
        </div>

        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className='p-4 '>
            <div className='flex justify-between'>
              <IoClose className='text-2xl' size={30} onClick={toggleSidebar} />
              <Link to='/cart' onClick={toggleSidebar}>
                <FaShoppingCart color={'black'} size={30} className='text-xl' />
                {totalItemCount > 0 && <span className=' text-white text-[.6rem] position-relative bottom-8 left-4'>{totalItemCount}</span>}
              </Link>
            </div>
            
            <ul className='mt-3 h-80 flex flex-col justify-evenly '>
              <li><Link to='/' onClick={toggleSidebar} className='text-xl'>Home</Link></li>
              <li onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='text-xl'>Products
                {isDropdownOpen && (
                  <ul className='bg-white shadow-2xl pl-1 pt-1 pd-1 leading-4'>
                    <li onClick={() => handleCategoryChange({ target: { value: "" } })} className='text-black hover:bg-slate-100 text-[.35rem] pt-1'>ALL CATEGORIES</li>
                    {categories && categories.map((category, index) => (
                      <li key={index} onClick={() => handleCategoryChange({ target: { value: category.name } })} className='text-black text-[.35rem] hover:bg-slate-100'>
                        {category.name.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><Link to='/contacts' onClick={toggleSidebar} className=' text-xl'>Contacts</Link></li>
              <li><Link to='/services' onClick={toggleSidebar} className=' text-xl'>Services</Link></li>
            </ul>
            <div className='mt-6'>
              <button onClick={() => { toggleSidebar(); handleContactButtonClick(); }} className='bg-black text-white mt-4 px-3 py-2 rounded-md shadow-2xl position-relative top-20'>Get Quote</button>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex w-[55vw] md:w-[55vw] lg:w-[60vw] h-[13vh] md:h-[14vh] lg:h-[15vh]'>
          <ul className='w-[100%] flex justify-evenly lg:justify-end lg:pr-5 lg:gap-12 items-center text-[.7rem] md:text-lg lg:text-2xl text-black font-semibold'>
            <li><Link to='/'>Home</Link></li>
            <li
              style={{ position: 'relative', cursor: 'pointer', color:'red'}}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              onClick={()=>setMenuOpen(!menuOpen)}
            >
              Products
              {isDropdownOpen && (
                <div className='absolute md:w-[55vw] lg:w-[50vw] top-[7.5vh] md:top-[8.6vh] lg:top-[4vh] md:left-[-15.5vw] lg:left-[-19vw] z-50 bg-slate-900 text-white shadow-2xl rounded-2xl rounded-t-none border-t-transparent border-2'>
                  <ul className='grid grid-cols-3 grid-rows-5 h-[100%] w-[100%]'>
                    <li onClick={() => handleCategoryChange({ target: { value: "" } })} className='hover:text-red-500 md:text-[.7rem] lg:text-[1rem] text-center pt-1'>ALL CATEGORIES</li>
                    {categories && categories.map((category, index) => (
                      <li key={index} onClick={() => handleCategoryChange({ target: { value: category.name } })} className='hover:text-red-500 md:text-[.7rem] lg:text-[1rem] text-center pt-1'>
                        {category.name.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li><Link to='/contacts'>Contacts</Link></li>
            <li><Link>Services</Link></li>
          </ul>
        </div>

        <div className='hidden w-[20.3vw] md:w-[18.3vw] lg:w-[20vw] h-[13vh] md:h-[14vh] lg:h-[15vh] md:flex justify-center items-center lg:gap-10'>
  <Link to='/cart' className='relative'>
    <FaShoppingCart color={'black'} size={38} className='text-xl md:text-2xl lg:text-4xl' />
    {totalItemCount > 0 && (
      <span
        className='absolute top-0 right-0 transform translate-x-[30%] translate-y-[-30%] bg-[red] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'
      >
        {totalItemCount}
      </span>
    )}
  </Link>
  <div>
    <button
      onClick={handleContactButtonClick}
      className='bg-black text-white ml-1 px-1 text-[.6rem] lg:w-24 lg:h-12 rounded-md md:rounded-lg lg:rounded-lg shadow-2xl lg:text-lg'
    >
      Get Quote
    </button>
  </div>
</div>

      </div>
    </>
  );
};
