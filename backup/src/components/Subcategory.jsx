import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Subcategory.css';
import { useCart } from '../CartContext';
import { useProducts } from '../ProductsProvider';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';

export const Subcategory = ({ toggleModal }) => {
    const { categories, dropdownProducts,convertPrice, currencyTo, setCurrencyTo  } = useProducts();
    const { encodedName } = useParams();
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    

    // Filtering function
    const filterDataByCategory = () => {
        const dataFiltered = dropdownProducts.filter((prod) =>
            prod.categories.some((cat) => cat.name === decodeURIComponent(encodedName))
        );
        setFilterData(dataFiltered);
    };

    useEffect(() => {
        if (dropdownProducts.length > 0) {
            filterDataByCategory();
            setLoading(false);
        }
    }, [dropdownProducts, encodedName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    function removeHtmlTags(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }
console.log("filtered data is",filterData)
const renderItem = filterData.map((product, index) => {
    const textContent = removeHtmlTags(product.description);
    const convertedPrice = convertPrice(product.price, currencyTo);
    return ( 
        // <div className='cardContainer2' key={product.id}>
        //     <div className='carddiv1'>{index + 1}</div>
        //     <div className='carddiv2'>{product.name}</div>
        //     <div className='carddiv3'>{product.name}</div>
        //     <div className='carddiv4'>{textContent}</div>
        //     <div className='carddiv5'>{product.stock_quantity}</div>
        //     <div className='carddiv6'>{convertedPrice}</div>
        //     <div className='carddiv7'>
        //         <div className="subcategoryimage">
        //             <img
        //                 src={product.images[0]?.src || '/assets/defaultImage.jpg'}
        //                 alt={product.name || 'Product Image'}
        //             />
        //         </div>
        //     </div>
        //     <div className = 'flex w-24 font-bold'>
        //         <button onClick={() => addToCart(product)}>Add to Cart</button>
        //     </div>
        // </div>
          <div className='cardContainer2 w-[90vw] h-16  flex justify-evenly  border-2 rounded-md shadow-md mb-4 ml-5 lg:ml-10' key={product.id}>
            <div className=' w-[5vw]  lg:w-[5vw] flex justify-center items-center  font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{index + 1}</div>
            <div className=' w-[10vw] lg:w-[5vw]  flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{product.name}</div>
            <div className=' w-[10vw] lg:w-[5vw]  flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{product.name}</div>
            <div className=' w-[20vw] lg:w-[20vw]  flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{textContent}</div>
            <div className=' w-[5vw]  lg:w-[5vw] flex justify-center items-center  font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>1</div>
            <div className=' w-[5vw]  lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{convertedPrice}</div>
            <div className=' w-[7vw]  lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem]  lg:text-[.8rem]'>
                <div className="subcategoryimage">
                    <img className='w-8 h-8 md:w-10  lg:w-12 lg:h-12 hover:w-40 hover:h-36 hover:z-50'
                        src={product.images[0]?.src || '/assets/defaultImage.jpg'}
                        alt={product.name || 'Product Image'}
                    />
                </div>
            </div>
            <div className = ' flex w-5 md:w-12 lg:w-20 font-bold text-[.4rem] md:text-[.6rem] lg:text-[.9rem]' >
                <button onClick={() => addToCart(product)} className='hover:text-[red]'>Add to Cart</button>
            </div>
        </div>
    );
});


    return (
        <div className='mainContainer'>
            <div className='infoContainer'>
                <p><b>SAS Engineering</b></p>
                <p><b>Toll Free: 9850418036 | Email: <a href ="#">marketing@sasengineering.in</a> | GST Number: 27AATCS4445F1ZY</b></p>
            </div>
            <div className="container2">
                {/* <div className="categoriesContainer">
                    <h5>Browse Categories</h5>
                    {
                        categories.map((item) => (
                            <ul key={item.name}>
                                <li>
                                    <Link to={`/subcategory/${encodeURIComponent(item.name)}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            </ul>
                        ))
                    }
                </div> */}
                <div>
                    <div className="cardContainer2 w-[90vw] h-16  flex justify-evenly border-2 rounded-md shadow-md mt-10 mb-4 md:ml-5 lg:ml-10 ml-5 ">
                    <div className=' w-[2vw] lg:w-[5vw] md:text-[.9rem]  flex justify-center lg:justify-center items-center font-bold text-[.5rem]' >Sr.No</div>
                    <div className='w-[5vw]  lg:w-[5vw] md:text-[.9rem] flex justify-center  lg:justify-start items-center font-bold text-[.5rem]' >Maker</div>
                    <div className='w-[5vw]  lg:w-[5vw] md:text-[.9rem] flex justify-center  lg:justify-start items-center font-bold text-[.5rem]'>Product Name</div>
                    <div className='w-[20vw] lg:w-[15vw]  md:text-[.9rem] flex justify-center  items-center font-bold text-[.5rem]'>Description</div>
                    <div className='w-[5vw]  lg:w-[5vw] md:text-[.9rem] flex justify-center  lg:justify-center items-center  font-bold text-[.5rem]'>Quantity</div>
                    <div className='w-[5vw]  lg:w-[5vw] md:text-[.9rem] flex justify-center  lg:justify-center items-center font-bold text-[.5rem]'>Price</div>
                    <div className='w-[5vw]  lg:w-[5vw] md:text-[.9rem] flex justify-center  lg:justify-start items-center font-bold text-[.5rem]'>Image</div>
                    <div className='flex justify-center items-center w-5  font-bold text-[.5rem] md:text-[.9rem]'>Cart</div>
                    {/* <div className = 'flex w-24'>
                        Cart
                    </div> */}
                    </div>
                    {renderItem}
                </div>
            </div>
            {/* <div className='footerContainer'>
                <Footer />
            </div> */}
        </div>
    );
};
