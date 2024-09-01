import React, { useEffect, useState } from "react";
import Nav from "../component/Nav.js";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { Link } from "react-router-dom";
import Categorydata from "../component/categorydata.js";
import Pagination from "../component/Pagination.js";
import axios from "axios";
import './category.css'; 

function Categories({ token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBrand, setActiveBrand] = useState(null);
  const itemsPerPage = 10;
  
  const brands_api_url = "http://127.0.0.1:8000/api/brand";
  const products_api_url = "http://127.0.0.1:8000/api/product";
  const brands_products_api_url = "http://127.0.0.1:8000/api/brand-products?brand_id=";

  const getBrands = async () => {
    const response = await axios.get(brands_api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBrands(response.data.data.brands.data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get(products_api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.data.products.data);
    setLoading(false);
    setActiveBrand(null);
  };

  const getProductInBrand = async (id) => {
    const response = await axios.get(`${brands_products_api_url}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.data.products.data);
    setActiveBrand(id);
  };

  useEffect(() => {
    fetchProducts();
    getBrands();
  }, [token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="fixed-top">
        <Header token={token} />
        <Nav />
      </div>
      <div className="container1">
        <div className="sidebar1">
          <ul className="list-unstyled">
            <li className={`bold-item1 ${!activeBrand ? 'active-link' : ''}`}>
              <Link className='link1' onClick={fetchProducts}>
                All Brands
              </Link>
            </li>
            {brands.map((brand, index) => (
              <li key={index} className={`list-item1 ${activeBrand === brand.id ? 'active-link' : ''}`}>
                <Link className='link1' onClick={() => getProductInBrand(brand.id)}>
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-grid1">
          {loading ? (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"588px"}}>
              <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            </div>
          ) : (
            currentItems.map((product) => (
              <Categorydata
                key={product.id}
                key2={product.id}
                title={product.name}
                price={product.price}
                desc={product.short_description}
                rating={product.average_rating}
                favorite={product.is_favorite}
                img={product.image}
                token={token}
              />
            ))
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Categories;
