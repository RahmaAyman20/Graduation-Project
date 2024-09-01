import React from "react";
import Nav from '../component/Nav.js';
import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import Profiledata from "../component/Profiledata.js";


function Profile({token,id}){
    
    return(
        <>
        <div className="fixed-top">
     <Header token={token}/>
       <Nav/>
     </div>
        <Profiledata token={token} id={id}/>
        <Footer/>
        </>
    );
    }
export default Profile;