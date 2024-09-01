import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
export default function Spinner(){
    return(
        <>
        <Header/>
        <Nav/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            </div>
            <div style={{height:"250px"}}></div>
            <Footer/>
        </>
    )
}