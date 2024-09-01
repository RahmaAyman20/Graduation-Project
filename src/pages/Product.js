import React, { useContext } from "react";
import Nav from '../component/Nav.js';
import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ProductInfo from "../component/ProductInfo.js";
import ReviwesInfo from "../component/ReviewsInfo.js";
import Likedinfo from "../component/Likedinfo.js";
function Product({token}){
    return(
        <>
       <div className="fixed-top">
     <Header token={token}/>
       <Nav/>
     </div>
        <ProductInfo token={token} />
        <h4 className="text-left" style={{marginLeft:"100px"}}>DETAILED REVIEWS <hr style={{width:"300px"}}/></h4>
       <div className="row text-center" style={{justifyContent:'space-around',alignItems: 'baseline',display:'grid',gridTemplateColumns: '40% 25%'}}>
        <div className="col border rounded shadow" style={{ padding:"15px "}}><ReviwesInfo token={token}/></div>
        <div className="col container border rounded " style={{backgroundColor:"white",padding:"20px"}}>
            <h5 style={{textAlign:"left",fontWeight:"bolder"}}>You May Like</h5>
            <Likedinfo token={token}/>
        </div>
       </div>
       <div style={{display:"grid",gridTemplateColumns:`${100/5}$`}}>
        </div>
        <Footer/>
        </>
    );
    }
    export default Product;