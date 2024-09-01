import React, { useContext ,useState} from "react";
import { FaHeart } from "react-icons/fa";
import {ProductContext} from"../context/ProductContext";

import axios from 'axios';
function ProductAnalysisCard({key2,title,desc,price,brand,img,token, summN,summP,rating}){
  const [isExpanded, setIsExpanded] = useState(false);
  const getTruncatedText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const descriptionLimit = 200;
  const toggleExpand = () => setIsExpanded(!isExpanded);
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
      };
      const Rating = ({ rating }) => {
        const filledStars = Math.round(rating);
         const stars = Array.from({ length: 5 }, (_, index) => (
          <Star key={index} filled={index < filledStars} />
        ));
      
        return <i>{stars}</i>;
      };
    return(
        <>
        <div key={key2} className="row justify-content-center mb-3" style={{marginTop: '150px'}}>
      <div className="col-md-12 col-xl-10">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={img}className="w-100 rounded" />
                  <a href="#!">
                  <div className="hover-overlay">
                    <div className="mask"></div>
                  </div>
                  </a>
                </div>
                   {/*<SmallImg imgs={img}/> */}
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5>{title}</h5>
                <div className="text-danger mb-1 me-2">
                    <Rating rating={rating}/>
                    <span className="mx-2">({rating})</span>
                    <span className="text-muted"> • </span>
                    <span className="mx-0 text-muted">{brand}</span>
                  </div>
                <p className="mb-4 mb-md-0">
                      <p>
                        {isExpanded ? desc : getTruncatedText(desc, descriptionLimit)}
                      </p>
                      <span className="text-primary" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </span>
                    </p>
                  <hr />
                  <div style={{ marginTop: "-10px" }}>
                    <p style={{fontWeight:"bolder"}}>Reviews Overview:</p><br />
                    <ul style={{marginTop:"-35px"}}>
                    <li><span className="text-primary">Positive Overview:</span> {summP}</li><br />
                    <li style={{marginTop:"-10px"}}><span className="text-primary">Negative Overview:</span> {summN}</li><br />
                    </ul>
                  </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none " style={{height:"fit-content",padding:"10px"}}>
                <div className="border rounded " style={{height:"fit-content",padding:"10px"}}>
                <div className="d-flex flex-row align-items-center mb-1">
                  <span style={{fontWeight:"bolder"}}>{price} EG</span>
                </div>
                <h6 className="text-success">Free shipping</h6>
                </div>
                <span className="btn text-primary btn-sm" style={{ margin:"auto 50px" }} type="button" onClick={()=>handleAddToFavorites()}><FaHeart /> save for later </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
        </>
    );
    }
    export default ProductAnalysisCard;