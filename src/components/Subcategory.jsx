import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useProducts } from '../ProductsProvider';

export const Subcategory = ({ toggleModal }) => {
    const { dropdownProducts, convertPrice, currencyTo } = useProducts();
    const { encodedName } = useParams();
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    // Calculate the current products to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for pagination controls
    const totalPages = Math.ceil(filterData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    function removeHtmlTags(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    const renderItem = currentItems.map((product, index) => {
        const textContent = removeHtmlTags(product.description);
        const convertedPrice = convertPrice(product.price, currencyTo);
        return (
            <div className='cardContainer2 w-[90vw] h-16 flex justify-evenly border-2 rounded-md shadow-md mb-4 ml-5 lg:ml-10' key={product.id}>
                <div className='w-[5vw] lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{index + 1 + indexOfFirstItem}</div>
                <div className='w-[10vw] lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{product.name}</div>
                <div className='w-[10vw] lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{product.name}</div>
                <div className='w-[20vw] lg:w-[20vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{textContent}</div>
                <div className='w-[5vw] lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{product.stock_quantity}</div>
                <div className='w-[5vw] lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] md:text-[.6rem] lg:text-[.8rem]'>{convertedPrice}</div>
                <div className='w-[7vw] lg:w-[5vw] flex justify-center items-center font-bold text-[.4rem] lg:text-[.8rem]'>
                    <div className="subcategoryimage">
                        <img className='w-8 h-8 md:w-10 lg:w-12 lg:h-12 hover:w-40 hover:h-36 hover:z-50'
                            src={product.images[0]?.src || '/assets/defaultImage.jpg'}
                            alt={product.name || 'Product Image'}
                        />
                    </div>
                </div>
                <div className='flex w-5 md:w-12 lg:w-20 font-bold text-[.4rem] md:text-[.6rem] lg:text-[.9rem]'>
                    <button onClick={() => addToCart(product)} className='hover:text-[red]'>Add to Cart</button>
                </div>
            </div>
        );
    });

    return (
        <div className='mainContainer'>
            <div className='infoContainer'>
                <p><b>SAS Engineering</b></p>
                <p><b>Toll Free: 9850418036 | Email: <a href="#">marketing@sasengineering.in</a> | GST Number: 27AATCS4445F1ZY</b></p>
            </div>
            <div className="container2">
                <div className="cardContainer2 w-[90vw] h-16 flex justify-evenly border-2 rounded-md shadow-md mt-10 mb-4 md:ml-5 lg:ml-10 ml-5">
                    <div className='w-[2vw] lg:w-[5vw] md:text-[.9rem] flex justify-center lg:justify-center items-center font-bold text-[.5rem]'>Sr.No</div>
                    <div className='w-[5vw] lg:w-[5vw] md:text-[.9rem] flex justify-center lg:justify-start items-center font-bold text-[.5rem]'>Maker</div>
                    <div className='w-[5vw] lg:w-[5vw] md:text-[.9rem] flex justify-center lg:justify-start items-center font-bold text-[.5rem]'>Product Name</div>
                    <div className='w-[20vw] lg:w-[15vw] md:text-[.9rem] flex justify-center items-center font-bold text-[.5rem]'>Description</div>
                    <div className='w-[5vw] lg:w-[5vw] md:text-[.9rem] flex justify-center lg:justify-center items-center font-bold text-[.5rem]'>Quantity</div>
                    <div className='w-[5vw] lg:w-[5vw] md:text-[.9rem] flex justify-center lg:justify-center items-center font-bold text-[.5rem]'>Price</div>
                    <div className='w-[5vw] lg:w-[5vw] md:text-[.9rem] flex justify-center lg:justify-start items-center font-bold text-[.5rem]'>Image</div>
                    <div className='flex justify-center items-center w-5 font-bold text-[.5rem] md:text-[.9rem]'>Cart</div>
                </div>
                {filterData.length > 0 ? renderItem : <div className="flex justify-center items-center text-lg md:text-2xl lg:text-3xl font-bold w-[100vw] h-[40vh]">No products to display</div>}

                {/* Pagination Controls */}
                {
                  filterData.length > 0 ?  <div className="pagination flex justify-center items-center mt-6 mb-5 ">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'} rounded hover:bg-gray-300`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div> : <div>
                   
                </div>
                }
                
            </div>
        </div>
    );
};
