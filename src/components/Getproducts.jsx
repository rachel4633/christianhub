import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

// Carousel imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import slide1 from "../static/images/slide1.jpeg";
import slide2 from "../static/images/slide2.jpg";
import slide5 from "../static/images/slide5.jpg";
import slide6 from "../static/images/slide6.jpg";

import '../css/Getproducts.css';


const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://nkiroterakel.alwaysdata.net/static/images/";

  // Top carousel settings
  const topCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://nkiroterakel.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className='row' style={{ backgroundColor: "#0a1a2f", padding: "20px" }}>
      
      {/* 🔹 TOP IMAGE CAROUSEL */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "30px" }}>
        <Slider {...topCarouselSettings}>
          {[slide1, slide2, slide5, slide6].map((slide, index) => (
            <div key={index}>
              <img src={slide} className="carousel-img" alt={`slide-${index+1}`} />
            </div>
          ))}
        </Slider>
      </div>

      <h3 className="text-warning text-center mb-4">Available Products</h3>
      {loading && <Loader />}
      <h4 className="text-danger text-center">{error}</h4>

      {/* 🔹 PRODUCT GRID */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card shadow" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="product-img"
              />
              <div className="card-body text-center">
                <h4 className="text-warning mb-2">{product.product_name}</h4>
                <p className="text-light">
                  {product.product_description.length > 70
                    ? product.product_description.slice(0, 70) + "..."
                    : product.product_description}
                </p>
                <b className="text-info">Kes {product.product_cost}</b>
                <br />
                <button
                  className="btn btn-outline-light mt-2"
                  onClick={() => navigate("/makepayment", { state: { product } })}
                >
                  <h5 className='text-danger'>Purchase Now</h5>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproducts;