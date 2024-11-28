import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';
import { useProducts } from '../ProductsProvider';
import { FaSpinner } from 'react-icons/fa';

export const Products = () => {
    const { categories, loading } = useProducts();
    
    if (loading) {
        return (
            <div className="flex justify-center items-center w-[100vw] h-[90vh]">
                <FaSpinner className="animate-spin lg:text-5xl md:text-4xl text-3xl" />
                <p className="ml-2 text-lg md:text-2xl lg:text-3xl">Loading categories...</p>
            </div>
        );
    }
    
    // console.log('category data is',categories)
    return (
        <>
            <h4 style={{ textAlign: 'center', marginTop: '1vh' }} className='md:text-2xl lg:text-3xl tracking-wide'><b>Categories</b></h4>
            <div className="container1">
                {categories && categories.map((product) => {
                    const encodedName = encodeURIComponent(product.name);
                    const category = product.name;

                    return (
                        <div className='productContainer' key={product.id}>
                            <Link to={`/subcategory/${encodedName}`} className='cardContainer'>
                                <div className='content'>
                                    <div className="image">
                                        <img
                                            src={product.image?.src || '/assets/defaultImage.jpg'}
                                            alt={product.name || 'Product Image'}
                                        />
                                    </div>
                                </div>
                            </Link>
                            <p><b>{category}</b></p>
                        </div>
                    );
                })}
                
            </div>
        </>
    );
};
