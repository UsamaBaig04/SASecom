import React, { useState } from 'react';
import '../styles/Cart.css';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { MdDelete } from "react-icons/md";
import { Modal } from './Modal';

export const Cart = ({ handleContactClick }) => {
    const { cartItems, clearCart, incrementFromCart, decrementFromCart, removeFromCart } = useCart();
    const navigate = useNavigate();
    console.log("cartItems is:", cartItems);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleShopNowClick = () => {
        navigate('/');
    };

    const handleContactButtonClick = () => {
        const descriptions = cartItems.map(item => item.description);
        handleContactClick(descriptions);
    };

    const handleCloseModal = () => {
        setModalOpen(!isModalOpen);
    };

    function removeHtmlTags(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(cartItems.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className='cartContainer1'>
            {cartItems.length > 0 ? (
                <div>
                    <div className='infoContainer'>
                        <p><b>SAS Engineering</b></p>
                        <p><b>Toll Free: 9850418036 | Email: <a href="#">marketing@sasengineering.in</a> | GST Number: 27AATCS4445F1ZY</b></p>
                    </div>
                    <div className="cartHeading1">
                        <div className='infoButtonDiv'>
                            <button onClick={clearCart} className='flex'> Clear Cart </button>
                            <button onClick={handleContactButtonClick}>Get Quote</button>
                        </div>
                    </div>
                    {currentItems.map((product, index) => {
                        const textContent = removeHtmlTags(product.description);

                        return (
                            <div className='cardContainerCart' key={product.id}>
                                <div className="CartImage">
                                    <img
                                        src={product.images && product.images.length > 0 ? product.images[0].src : '/assets/defaultImage.jpg'}
                                        alt={product.name || 'Product Image'}
                                    />
                                </div>
                                <div className="categoryContainer">
                                    <p style={{ textAlign: 'center' }}><b>{product.name}</b></p>
                                    <p>{product.category}</p>
                                    <p style={{ textAlign: 'center' }}>{textContent}</p>
                                </div>
                                <div className="priceContainer">
                                    <p style={{ textAlign: 'center', marginBottom: '1vh' }} className='lg:text-xl md:text-lg text-md'><b>₹ {product.price}</b></p>
                                    <div className='cartButton'>
                                        <button onClick={() => decrementFromCart(product.id)} disabled={product.count <= 1}>-</button>
                                        <div className='displayCounter'>{product.count}</div>
                                        <button onClick={() => incrementFromCart(product.id)}>+</button>
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            style={{ backgroundColor: 'red' }}
                                            className='flex justify-center items-center w-full h-full'
                                        >
                                            <span className='flex items-center justify-center w-full h-full'>
                                                <MdDelete />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

<div className="pagination flex justify-center mb-2">
    <button 
    onClick={handlePreviousPage} 
    disabled={currentPage === 1} 
    className={`px-4 py-2 mx-1 rounded-md 
    ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[red] hover:bg-red-600 cursor-pointer text-white'}`}
    >
    Previous
   </button>
<span className="mx-2 font-semibold">{currentPage} of {totalPages}</span>
    <button 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages} 
        className={`px-4 py-2 mx-1 rounded-md 
        ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[red] hover:bg-red-600 cursor-pointer text-white'}`}
    >
        Next
</button>
        </div>
                </div>
            ) : (
                <div className='basketContainer'>
                    <PiShoppingCartSimpleBold size={150} color={'red'} />
                    <p><b>You have no items in your cart</b></p>
                    <button onClick={handleShopNowClick} className='bg-[red] text-white px-1 mt-2 py-1 rounded-lg hover:bg-red-400 '>Shop Now</button>
                </div>
            )}
            {isModalOpen && <Modal message={modalMessage} onClose={handleCloseModal} />}
        </div>
    );
};
