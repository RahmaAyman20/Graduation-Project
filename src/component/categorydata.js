import React, { useState ,useContext} from 'react';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { FaAws } from 'react-icons/fa';
import {ProductContext} from"../context/ProductContext";
import axios from "axios";
import './Categoriess.css'; 

function Categorydata({ key2, title, price, rating, desc,img ,favorite,token }) {
    const [isFavorite, setIsFavorite] = useState(favorite);
    const {IdHandler}=useContext(ProductContext);
    const [favorites, setFavorites] = useState([]);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };
    const getTruncatedText = (text, limit) => {
        if (text.length <= limit) return text;
        return text.substring(0, limit) + '...';
      };
    
      const descriptionLimit = 15; 
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
    

    const Star = ({ filled }) => (
        <span style={{ color: filled ? 'gold' : 'lightgray' }}>
            &#9733;
        </span>
    );

    const Rating = ({ rating }) => {
        const filledStars = Math.round(rating);
        const stars = Array.from({ length: 5 }, (_, index) => (
            <Star key={index} filled={index < filledStars} />
        ));
        return <i>{stars}</i>;
    };
    const handleRemoveFavorite = async (favoriteId) => {
        try {
          const deleteUrl = `http://127.0.0.1:8000/api/favourites?product_id=${favoriteId}`;
          await axios.delete(deleteUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFavorites(favorites.filter((item) => item.product.id !== favoriteId));
        } catch (error) {
          console.error('Error removing product from favorites:', error);
        }
      };
    return (
        <Card className="card-container" style={{width:"fit-content"}}>
            <div className="card-img-container">
                <Card.Img variant="top" src={img} className="card-img" />
                <div className="card-overlay">
                <NavLink to="/Product"  className="view_details" type="button" onClick={()=>{IdHandler(key2)}}>View detials</NavLink>
                </div>
            </div>
            <hr style={{margin:"1px"}}></hr>
            <Card.Body>
                <div style={{fontWeight:"bold"}}>{getTruncatedText(title, descriptionLimit)}</div>
                <div
                    className="favorite-icon"
                    style={{ color: isFavorite ? 'blue' : 'blue' }}
                    onClick={!isFavorite?() => { handleAddToFavorites(); handleFavoriteClick();}:() => {handleRemoveFavorite(key2); handleFavoriteClick();}}                    >
                    {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                </div>
                <div style={{color:"gray",fontSize:"small"}}>{desc.slice(0,50)}</div>
                <div className="d-flex flex-row align-items-center mb-1">
                    <p className="me-1" style={{marginBottom:"-10px"}}>{price} EG</p>
                </div>
                <Card.Text>
                    <span ><Rating rating={rating} /> ({rating})</span>
                  
                    <span>
                        <FaAws style={{ fontSize: '30px', float: 'right', color: 'blue' }} />
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Categorydata;
