import React, { useContext, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa"; // Import FaStar from react-icons/fa
import { ProductContext } from "../context/ProductContext";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import './styles.css'; // Make sure to import the custom CSS

function ProductCard({ key2, desc, title, total_reviews, seller_name, price, rating, brand, img ,token }) {
  const { IdHandler } = useContext(ProductContext); // Remove 'id' as it is not used directly

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const getTruncatedText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const descriptionLimit = 200;

  const handleAddToFavorites = async () => {
    try {
      const favorites_url = 'http://127.0.0.1:8000/api/favourites';
      const response = await axios.post(favorites_url, { product_id: key2 }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Product added to favorites:', response.data);
    } catch (error) {
      console.error('Error adding product to favorites:', error);
    }
  };
  const Star = ({ filled }) => {
    return (
      <span style={{ color: filled ? 'gold' : 'lightgray' }}>
        &#9733; 
      </span>
    );
  };const Rating = ({ rating }) => {
    const filledStars = Math.round(rating);
     const stars = Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < filledStars} />
    ));
  
    return <i>{stars}</i>;
  };

  return (
    <>
      <div key={key2} className="row justify-content-center mb-3" style={{ marginTop: '40px' }}>
        <div className="col-md-12 col-xl-10">
          <div className="card shadow-0 border rounded-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src={img} className="w-100 rounded" alt={title} />
                    <a href="#!">
                      <div className="hover-overlay">
                        <div className="mask"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <h5>{title}</h5>
                  <div className="text-danger mb-1 me-2">
                    <span className="mx-2"><Rating rating={rating}/><span >({rating})</span>                    </span>
                    <span className="text-muted"> • </span>
                    <span className="text-muted">{total_reviews} </span>
                    <span className="mx-0 text-muted">reviews</span>
                  </div>
                  <div><hr></hr>
                    <p className="mb-4 mb-md-0">
                      <p>
                        {isExpanded ? desc : getTruncatedText(desc, descriptionLimit)}
                      </p>
                      <span className="text-primary" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </span>
                    </p>
                  </div><hr />
                  <div className="text-muted small" style={{ marginTop: "-10px" }}>
                    <span className="text-primary"> • </span>
                    <span>Brand: {brand}</span><br />
                    <span className="text-primary"> • </span>
                    <span>{seller_name}</span><br />
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none" style={{ height: "fit-content", padding: "10px" }}>
                  <div className="border rounded" style={{ height: "fit-content", padding: "10px" }}>
                    <div className="d-flex flex-row align-items-center mb-1">
                      <span style={{fontWeight:"bolder"}}>{price} EG</span>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="d-flex flex-column mt-4">
                      <NavLink to="/ProductAnalysis" activeClassName="active-link" className="btn btn-sm nav-link custom-btn" type="button" onClick={() => { IdHandler(key2) }}>Filter</NavLink>
                    </div>
                  </div>
                <span className="btn text-primary btn-sm " style={{margin:"auto 50px"}} type="button" onClick={()=>handleAddToFavorites()}><FaHeart /> save for later </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
