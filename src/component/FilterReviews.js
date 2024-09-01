import React, { useState, useEffect, useContext } from 'react';
import ReviwesCard from './ReviwesCard';
import PaginationP from './PaginationP.js';
import Sentiment from 'sentiment';
import { ProductContext } from "../context/ProductContext.js";
import axios from 'axios';

const FilterReviews = ({token}) => {

  const { id } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [freviews, setfReviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [error, setError] = useState(null);
  const api_url = `http://127.0.0.1:8000/api/product/${id}`;
  const api_url2 = `http://127.0.0.1:8000/api/reviews-analysis/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch reviews
        const response = await axios.get(api_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reviewsData = response.data.data.product.reviews;
        
        // Perform sentiment analysis on each review
        const sentiment = new Sentiment();
        const analyzedReviews = reviewsData.map(review => ({
          ...review,
          sentiment: sentiment.analyze(review.text)
        }));
  
        // Filter out fake reviews
        const filteredReviews = analyzedReviews.filter(review => !review.is_fake);
        setReviews(filteredReviews);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error('There was an error fetching the data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [api_url]);
  

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reviews.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <>
      <div className='container mt-5'>
      {currentPosts.map(review => (
  <div key={review.id}>
    <ReviwesCard
      name={review.reviewer}
      email={review.url}
      body={review.summarize}
      sentiment={review.sentiment.score}
    />
  </div>
))}

      </div>
      <PaginationP
        postsPerPage={postsPerPage}
        totalPosts={reviews.length}
        paginate={paginate}
      />
    </>
  );
};

export default FilterReviews;
