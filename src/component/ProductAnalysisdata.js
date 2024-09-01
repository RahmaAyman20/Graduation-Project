import React, { useState, useEffect, useContext } from 'react';
import ProductAnalysisCard from './ProductAnalysisCard';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';

const ProductAnalysisdata = ({ token }) => {
  const [data, setData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useContext(ProductContext);
  const api_url = `http://127.0.0.1:8000/api/reviews-analysis?product_id=${id}`;
  const api_url1 = `http://127.0.0.1:8000/api/product/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(api_url1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const product = response1.data.data.product;
        
        const response2 = await axios.get(api_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reviewAnalysis = response2.data.data;

        setData({
          ...product,
          positivity_average: reviewAnalysis.positivity_average,
          negativity_average: reviewAnalysis.negativity_average,
          rating_after_fake_filter: reviewAnalysis.rating_after_fake_filter,
          fake_percentage: reviewAnalysis.fake_percentage,
          collectionOfPositiveSummrize: reviewAnalysis.collectionOfPositiveSummrize,
          collectionOfNegativeSummrize: reviewAnalysis.collectionOfNegativeSummrize,
        });
      } catch (error) {
        setError(error);
        console.error('There was an error fetching the data:', error);
      }
    };
    fetchData();
  }, [token, id, api_url, api_url1]);

  if (error) {
    return <p>There was an error fetching the data: {error.message}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ProductAnalysisCard
        key={data.id}
        key2={data.id}
        title={data.name}
        desc={data.short_description}
        price={data.price}
        brand={data.brand.name}
        img={data.image}
        rating={data.rating_after_fake_filter}
        summP={data.collectionOfPositiveSummrize}
        summN={data.collectionOfNegativeSummrize}
        token={token}
      />
    </div>
  );
};

export default ProductAnalysisdata;
