import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

// Create a context for products
const ProductsContext = createContext();

// Custom hook for using the products context
export const useProducts = () => {
    return useContext(ProductsContext);
};

// Function to create OAuth headers
const createOAuthHeaders = (url, method) => {
    const consumerKey = 'ck_3f743af755ff5ab31a24ad3ce16babcf73dd3c94';
    const consumerSecret = 'cs_1ce16f18b00f8dd21487c0bdd2ac6af742f21c0c';

    const oauth = OAuth({
        consumer: { key: consumerKey, secret: consumerSecret },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
        }
    });

    const requestData = { url, method };
    return oauth.toHeader(oauth.authorize(requestData));
};

// ProductsProvider component
export const ProductsProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownProducts, setDropdownProducts] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({});
    const [currencyTo, setCurrencyTo] = useState('INR');

    // Function to fetch categories
    const fetchCategories = async () => {
        // const url = 'http://192.168.0.44/wordpress/wp-json/wc/v3/products/categories';
        const url = 'http://store.sasengineering.in/wp-json/wc/v3/products/categories';
        const headers = createOAuthHeaders(url, 'GET');

        try {
            const response = await axios.get(url, { headers });
            setCategories(response.data.filter(obj=>{ return obj.name !== "Uncategorized"}));
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch products
    const fetchProducts = async () => {
        // const url = 'http://192.168.0.44/wordpress/wp-json/wc/v3/products';
        const url = 'http://store.sasengineering.in/wp-json/wc/v3/products';
        const headers = createOAuthHeaders(url, 'GET');

        try {
            const response = await axios.get(url, { headers });
            setDropdownProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Function to fetch exchange rates
    const fetchExchangeRates = async () => {
        const url = 'https://api.exchangerate-api.com/v4/latest/INR';

        try {
            const response = await axios.get(url);
            setExchangeRates(response.data.rates);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    };

    // Function to convert price based on exchange rates
    const convertPrice = (price, currencyTo) => {
        const currencyCode = currencyTo.toUpperCase();
        if (!exchangeRates || !exchangeRates[currencyCode]) {
            console.warn(`Exchange rate for ${currencyCode} not found`);
            return price;
        }
        const rate = exchangeRates[currencyCode];
        return (price * rate).toFixed(2);
    };

    useEffect(() => {
        fetchCategories();
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            fetchProducts();
        }
    }, [categories]);

    return (
        <ProductsContext.Provider value={{ categories, loading, dropdownProducts, currencyTo, setCurrencyTo, convertPrice }}>
            {children}
        </ProductsContext.Provider>
    );
};
