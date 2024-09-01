import Nav from "../component/Nav.js";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { Container, Row, Card } from "react-bootstrap";
import "./home.css";
import { useState, useEffect ,useRef} from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import Categorydata from "../component/categorydata.js";

function Home({ token }) {
  function Carousels() {
    return (
      <Carousel className="text-white">
        <Carousel.Item>
          <img
            className="d-block"
            src="asset/slid1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="asset/slid2.jpg"
            alt="Second slide"
          />
          
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="asset/slid3.jpg"
            alt="Third slide"
          />
         
        </Carousel.Item>
      </Carousel>
    );
  }

  const [recommended, setRecommended] = useState([]);
  const hasFetchedData = useRef(false);
  const recommended_api_url = "http://127.0.0.1:8000/api/recomended";

  const fetchRecommended = async () => {
    const response = await axios.get(recommended_api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setRecommended(response.data.data.products);
  };


  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchRecommended();
      hasFetchedData.current = true;
    }
  }, [token]);


  return (
    <>
      <div className="fixed-top">
      <Header token={token} />
        <Nav />
      </div>
      <div className="content " style={{marginTop:"127px"}}>
        <Carousels />
        <Container style={{ marginTop: "50px" }}>
          <h1>Recomended items</h1>
          <div style={{ display:"grid",gridTemplateColumns:"auto auto auto"}}>
            {recommended.map((item, index) => {
                if (index < 3) {
                  return (
                    <Categorydata
                      key={item.product.id}
                      key2={item.product.id}
                      title={item.product.name}
                      price={item.product.price}
                      desc={item.product.short_description}
                      rating={item.product.average_rating}
                      favorite={item.product.is_favorite}
                      img={item.product.image}
                      token={token}
                    />
                  );
                }
              })}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Home;
