import React from "react";
import { useEffect, useState} from "react";
import Liked from "./Liked.js";
import axios from 'axios';

export default function Likedinfo({token}){
  const api_url = `http://127.0.0.1:8000/api/product`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(api_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setdata(response.data.data.products.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error('There was an error fetching the data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);
 return(
   <>
        {data.map(product=> (
           <Liked
           key={product.id}
           key2={product.id}
           title={product.name.slice(0,11)}
           price={product.price}
           img={product.image}
          />
        ))}
    </>
);
}