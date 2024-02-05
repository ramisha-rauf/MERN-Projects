import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { json } from "react-router-dom";

export default function Home() {
  const [search,setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.foodItems && data.foodCategory) {
        setFoodItem(data.foodItems);
        setFoodCat(data.foodCategory);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container m-3">
        {foodCat.length !== 0 &&
          foodCat.map((category) => (
            <div className="row mb-3" key={category._id}>
              <div className="fs-3 m-3">
                {category.CategoryName}
                <hr />
                <div className="row">
                  {foodItem.length !== 0 &&
                    foodItem
                      .filter(
                        (item) => ((item.CategoryName === category.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                      )
                      .map((filterItem) => (
                        <div
                          key={filterItem._id}
                          className="col-12 col-md-6 col-lg-3 m-0"
                        >
                          <Card
                            foodItem={filterItem}
                            //foodName={filterItem.name}
                            options={filterItem.options[0]}
                            //imgSrc={filterItem.img}
                            //description={filterItem.description}
                          ></Card>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          ))}
        
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
