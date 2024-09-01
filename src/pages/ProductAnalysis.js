import React, { useContext, useState ,useEffect} from "react";
import Nav from '../component/Nav.js';
import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ProductAnalysisdata from "../component/ProductAnalysisdata.js";
import FilterReviews from"../component/FilterReviews.js";
import ProductAcard from"../component/ProductAcard.js"
import { ProductContext } from "../context/ProductContext.js";
import axios from "axios";
function ProductAnalysis({token}){
  const[price,setprice]=useState("");
  const{id}=useContext(ProductContext);
  const api_url = `http://127.0.0.1:8000/api/reviews-analysis?product_id=${id}`;
  const getPrice = async () => {
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setprice(response.data.data.price_tracking_chart);
  };
  useEffect(() => {
    getPrice();
  }, [token]);
    return(
        <>
        <div className="fixed-top">
     <Header token={token}/>
       <Nav/>
     </div>
     <ProductAnalysisdata token={token}/>
     <h4 className="text-left" style={{margin:"60px"}}>Data Analysis<hr style={{width:"300px"}}/></h4>
      <div style={{display:"grid",gridTemplateColumns:"30% 30% 30%",justifyContent:"space-evenly", margin:"0px 50px 50px"}}>
      <ProductAcard token={token}/>
        </div> 
        <h4 className="text-left" style={{marginLeft:"100px"}}>Price Tracking <hr style={{width:"300px"}}/></h4>
         <div className="col container border rounded " style={{backgroundColor:"white"}}>
            <div>
            <img src={price} style={{width:"100%"}}/>
            </div>
        </div>
         <h4 className="text-left" style={{marginLeft:"100px",marginTop:"50px"}}>FIlTERED REVIEWS <hr style={{width:"300px"}}/></h4>
         <div className="border rounded shadow " style={{margin:"60px auto",width:"70%"}}><FilterReviews token={token}/></div>   
        <Footer/>
        </>
    );
    }
    export default ProductAnalysis;