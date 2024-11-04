# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




use aakrish as password as signup inorder to get admin facilities.

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";

export default function Food() {
    // Form states
    const [foodName, setFoodName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [outPic, setOutPic]= useState(null);


    // Handle ingredient field changes
    const handleIngredientChange = (index, event) => {
        const values = [...ingredients];
        values[index][event.target.name] = event.target.value;
        setIngredients(values);
    };

    // Add more ingredient fields
    const addIngredientField = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    // Remove ingredient fields
    const removeIngredientField = (index) => {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page reload
        
        // Initialize FormData and append each field to it
        const formData = new FormData();
        formData.append('name', foodName);
        formData.append('categoryName', categoryName);
        formData.append('shortDescription', shortDescription);
        formData.append('description', description);
        formData.append('image', image);
    
        // Append each ingredient as JSON, because FormData doesn't handle nested arrays well
        const ingredientsJson = JSON.stringify(ingredients);
        formData.append('ingredients', ingredientsJson); // Add ingredients as JSON string
    
        formData.forEach((element)=>{
            console.log(element); 
        })
    
        try {
            await axios.post("http://localhost:9000/api/createfood", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log('Food item submitted successfully');
            showAlert("food added succesfully"); // Show error alert if submission fails
            
            // Clear the form
            setFoodName("");
            setCategoryName("");
            setShortDescription("");
            setDescription("");
            setImage(null);
            setOutPic(null);
            setIngredients([{ name: "", quantity: "" }]);
        } catch (error) {
            console.error("Error submitting food item:", error);
            showAlert("Error submitting food item"); // Show error alert if submission fails
        }
    };
    const handleImage = (e) => {
        const file = e.target.files[0]
        console.log("e.target.file[0]" + file);
        setImage(file);
        if (file) {
           const imageUrl = URL.createObjectURL(file); // Create a preview URL
             console.log(imageUrl)
             setOutPic(imageUrl);
        }
    }

    const showAlert = (msg)=>{
        alert(msg);
    }

    return (
        <div>
            <Navbar></Navbar>
            <form onSubmit={handleSubmit}>
                {/* Food Name */}
                <div className="form-group">
                    <label>Food Name</label>
                    <input type="text" className="form-control" placeholder="Food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                </div>

                {/* Category */}
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required>
                        <option value="">Select category</option>
                        <option value="meat">Meat</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lactosefri">Lactosfri</option>
                        <option value="glutonfri">Glutonfri</option>
                        <option value="vegan">Vegan</option>
                    </select>
                </div>

                {/* Ingredients */}
                <div className="form-group">
                    <label>Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-field">
                            <input type="text" className="form-control" placeholder="Ingredient name" name="name" value={ingredient.name} onChange={(event) => handleIngredientChange(index, event)} required />
                            <input type="text" className="form-control" placeholder="Quantity" name="quantity" value={ingredient.quantity} onChange={(event) => handleIngredientChange(index, event)} required />
                            {ingredients.length > 1 && (
                                <button type="button" onClick={() => removeIngredientField(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredientField}>
                        Add Ingredient
                    </button>
                </div>

                {/* Short Description */}
                <div className="form-group">
                    <label>Short Description</label>
                    <textarea className="form-control" rows="3" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required ></textarea>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label>Methods / Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <img src={outPic} style={{height:"10rem", width:"10rem"}} alt="choose a file" ></img>
                    <input type="file" accept="image/jpeg, image/jpg, image/png" className="form-control-file" id="inputPic" onChange={handleImage} />
                </div>
                <hr></hr>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}


------------------------------------------------------------------------------------------------------------------------------------------------------------------


import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.js"
import Footer from "../components/Footer.js"
import Card from "../components/Card.js"
import ViewFood from './ViewFood.js'
import Modal from "../Modal.js"
import charImage from '../components/images/char.png';
import cofeImage from "../components/images/coffee.png";
import sandwichImage from "../components/images/sandwich.png";
import AdminView from './AdminView.js'

export default function Home() {
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [selectedFood, setSelectedFood] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        let response = await fetch("http://localhost:9000/api/getFood", {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" }
        });
        response = await response.json();
        // console.log(response[0], response[1])
        setFoodCat(response[0]);
        setFoodItem(response[1]);
    }
    console.log("foodlength: ", foodItem.length) //gave me length 6 

    const handleCardClick = (food) => {
        console.log(food)
        setSelectedFood(food);
        setIsOverlayOpen(true);
    };



    return (
        <div>
            <Navbar ></Navbar>
            <div>

                <div id="carouselExample" className="carousel slide"  >
                    <div className="carousel-inner" style={{ maxHeight: "400px" }} >
                        <div className=" carousel-caption  " style={{ zIndex: "1" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="search food..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
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
            <div>
                {foodCat.length !== 0 ? foodCat.map((data) => {
                    return (
                        <div key={data._id} className='row mb-3'>
                            <div className="fs-3 m-3">{data.categoryName}</div>
                            <hr />
                            {foodItem.length !== 0 ? foodItem.filter((element) => (element.categoryName === data.categoryName) && (element.name.toLowerCase().includes(search.toLowerCase())))
                                .map((filterItem) => {
                                    return (
                                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card foodName={filterItem.name} foodIntro={filterItem.shortDescription} foodImg={filterItem.image}
                                                onClick={() => handleCardClick(filterItem)} />
                                        </div>
                                    )
                                }) : ""}
                        </div>
                    )
                }) : ""
                }
                {localStorage.getItem("admin") === "false" ?
                    <Modal isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}><ViewFood select={selectedFood}></ViewFood></Modal>
                    : <Modal isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}><AdminView select={selectedFood}></AdminView></Modal>
                }
            </div>
            <Footer></Footer>
        </div>
    )
}

