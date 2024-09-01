import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';

const ProductInfo = ({token}) => {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useContext(ProductContext);
  const api_url = `http://127.0.0.1:8000/api/product/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductData(response.data.data.product);
      } catch (error) {
        setError(error);
        console.error('There was an error fetching the data:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div style={{ marginTop: '150px' }}>
      {error && <div>Error: {error.message}</div>}
      {productData && (
        <ProductCard
          key={productData.id}
          key2={productData.id}
          desc={productData.short_description}
          title={productData.name}
          price={productData.price}
          rating={productData.average_rating}
          img={productData.image}
          brand={productData.brand.name}
          seller_name={productData.seller_name}
          total_reviews={productData.total_reviews}
          url={productData.url}
          token={token}
        />
      )}
    </div>
  );
};

export default ProductInfo;
