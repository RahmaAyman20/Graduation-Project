import Nav from "../component/Nav.js";
import Header from "../component/Header.js";
import Footer from "../component/Footer.js";
import { Row, Col, Container } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";
import "./history.css";
import { useState, useEffect } from "react";

import axios from "axios";

function History({token}) {

  const api_url = "http://127.0.0.1:8000/api/recent";
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const token = "5|78O5nAEGWzPhfsUcPCF1xYMPv9mqOdWh7MO07k3Fca5824d3";
      const response = await axios.get(api_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecent(response.data.data.recent.data);
    };
    fetchData();
  }, [token]);

  return (
    <>
      <div className="fixed-top">
        <Header token={token} />
        <Nav />
      </div>
      <Container style={{ padding: "50px", marginTop: "80px" }}>
        {recent.map((item) => {
          return (
            <Row className="product" key={item.product.id}>
              <Col className="date col-11">{item.created_at}</Col>
              <img className="img col" src={item.product.image} alt=""></img>
              <Col className="col-10">
                <h2 className="title">Amazon</h2>
                <p className="hist_p">{item.product.name}</p>
                <div style={{ marginBottom: "10px" }}>
                  <IoIosStar style={{ color: "#FF9017", fontSize: "25px" }} />
                  <span className="rate">{item.product.average_rating}</span>
                  <span className="reviews">({item.product.total_reviews} reviews)</span>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
      <Footer />
    </>
  );
}
export default History;
