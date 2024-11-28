import React, { useState } from 'react';
import '../styles/Cart.css';
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { MdDelete } from "react-icons/md";
import { Modal } from './Modal';

export const Cart = ({handleContactClick}) => {
    const { cartItems, clearCart, incrementFromCart, decrementFromCart, removeFromCart } = useCart();
    const navigate = useNavigate();
    console.log("cartItems is:",cartItems)
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
    return (
        <div className='cartContainer1'>
            
            {cartItems.length > 0 ? (
                <div>
                     <div className='infoContainer'>
            <p><b>SAS Engineering</b></p>
            <p><b>Toll Free: 9850418036 | Email: <a href ="#">marketing@sasengineering.in</a> | GST Number: 27AATCS4445F1ZY</b></p>
        </div>
                    <div className="cartHeading1">
                        <h1>Cart</h1>
                        <div className='infoButtonDiv'><button onClick={clearCart} className='flex'><MdDelete/> Clear Cart </button>
                        <button onClick={handleContactButtonClick}>Get Quote</button>
                        </div>
                    </div>
                    {cartItems.map((product, index) => {
    const textContent = removeHtmlTags(product.description);
    return (
        <div className='cardContainerCart' key={product.id}>
            <div className='content1'>
            <div className="image1">
    <img 
        src={product.images && product.images.length > 0 ? product.images[0].src : '/assets/defaultImage.jpg'} 
        alt={product.name || 'Product Image'}
    />
</div>

            </div>
            <div className="categoryContainer">
                <p style={{ textAlign: 'center' }}><b>{product.name}</b></p>
                <p>{product.category}</p>
                <p>{textContent}</p>
            </div>
            <div className="priceContainer">
                <p><b>₹ {product.price}</b></p>
                <div className='cartButton'>
                    <button onClick={() => decrementFromCart(product.id)} disabled={product.count <= 1}>-</button>
                    <div className='displayCounter'>{product.count}</div>
                    <button onClick={() => incrementFromCart(product.id)}>+</button>
                    <button onClick={() => removeFromCart(product.id)} style={{backgroundColor:'red'}} className='flex justify-center align-middle'><span className='flex  w-[100%] h-[100%] justify-center align-middle lg:pt-4'><MdDelete/></span></button>
                </div>
            </div>
        </div>
    );
})}

                     
                </div>
            ) : (
                <div className='basketContainer'>
                    <PiShoppingCartSimpleBold size={150} color={'red'} />
                    <p><b>You have no items in your cart</b></p>
                    <button onClick={handleShopNowClick} className='bg-[red] text-white px-1 mt-2 py-1 rounded-lg hover:bg-red-400 '>Shop Now</button>
                </div>
            )}
            {/* <Footer /> */}
            {isModalOpen && <Modal message={modalMessage} onClose={handleCloseModal} />}
        </div>
    );
};
