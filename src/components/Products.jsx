import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';
import { useProducts } from '../ProductsProvider';

export const Products = () => {
    const { categories, loading } = useProducts();
    
    if (loading) {
        return <p>Loading categories...</p>;
    }
    // console.log('category data is',categories)
    return (
        <>
            <h4 style={{ textAlign: 'center', marginTop: '1vh' }}><b>Categories</b></h4>
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
