import "./App.css";
import React, { useState} from "react";
import History from "./pages/History.js";
import SignUp from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import Contact from "./pages/Contact.js";
import Favorites from "./pages/Favorites.js";
import About from "./pages/About.js";
import Product from "./pages/Product.js";
import Profile from "./pages/profile.js";
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories.js";
import ProductAnalysis from "./pages/ProductAnalysis.js";
import Profiledata from "./component/Profiledata.js";
import Resetpassdata from "./component/Resetpassdata.js";
import Spinner from "./component/Spinner.js"
function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [id,setid] = useState(localStorage.getItem('id')); 
  return (
    <>
      {token? (
        <Routes>
          <Route path="/" element={<Home token={token} />}></Route>
          <Route path="/Home" element={<Home token={token}/>}></Route>
          <Route path="/History" element={<History token={token}/>}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route
            path="/SignIn"
            element={<SignIn setToken={setToken} setid={setid}/>}
          ></Route>
          <Route path="/Contact" element={<Contact token={token}/>}></Route>
          <Route path="/Favorites" element={<Favorites token={token}/>}></Route>
          <Route path="/About" element={<About token={token}/>}></Route>
          <Route path="/Product" element={<Product token={token} />}></Route>
          <Route path="/ProductAnalysis" element={<ProductAnalysis token={token}/>}></Route>
          <Route path="/Categories" element={<Categories token={token} />}></Route>
          <Route path="/Profile" element={<Profile token={token} id={id}/>}></Route>
          <Route path="/Resetpassdata" element={<Resetpassdata token={token}/>}></Route>
          <Route path="/Spinner" element={<Spinner token={token}/>}></Route>

        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn setToken={setToken}/>}></Route>
          <Route path="/Home" element={<Home token={token} />}></Route>
          <Route path="/History" element={<History  token={token}/>}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route
            path="/SignIn"
            element={<SignIn setToken={setToken} setid={setid}/>}
          ></Route>
          <Route path="/Contact" element={<Contact token={token} />}></Route>
          <Route path="/Favorites" element={<Favorites token={token}/>}></Route>
          <Route path="/About" element={<About token={token}/>}></Route>
          <Route path="/ProductAnalysis" element={<ProductAnalysis  token={token}/>}></Route>
          <Route path="/Product" element={<Product token={token}/>}></Route>
          <Route path="/Categories" element={<Categories  token={token}/>}></Route>
          <Route path="/Profile" element={<Profile  token={token} id={id}/>}></Route>
          <Route path="/Resetpassdata" element={<Resetpassdata  token={token}/>}></Route>
           <Route path="/Spinner" element={<Spinner token={token}/>}></Route>

        </Routes>
      )}
    </>
  );
}

export default App;
