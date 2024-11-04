import React from 'react'
import charImage from './images/char.png';
import cofeImage from "./images/coffee.png";
import sandwichImage from "./images/sandwich.png";


export default function Carousel() {
    return (
        <div>
            
            <div id="carouselExample" className="carousel slide"  >
                <div className="carousel-inner" style={{ maxHeight: "400px" }} >
                <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                        <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="search food..." aria-label="Search" />
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src={charImage} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={cofeImage} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={sandwichImage} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
