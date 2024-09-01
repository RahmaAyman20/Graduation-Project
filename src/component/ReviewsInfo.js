import React, { useState, useEffect, useContext } from 'react';
import ReviwesCard from './ReviwesCard';
import PaginationP from './PaginationP.js';
import { ProductContext } from "../context/ProductContext.js";
import axios from 'axios';

const ReviewsInfo  = ({token}) => {
  const { id } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [error, setError] = useState(null);
  const api_url = `http://127.0.0.1:8000/api/product/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(api_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data.data.product.reviews);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error('There was an error fetching the data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

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
          <ReviwesCard
            key={review.id}
            key2={review.id}
            name={review.reviewer}
            email={review.url}  // Assuming email field is the review URL
            body={review.text}
            loading={loading}
          />
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

export default ReviewsInfo;
