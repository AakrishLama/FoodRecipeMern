import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import {useFood} from "./FoodContext.js"
import axios from "axios";

export default function Food() {
    const { loadData } = useFood(); // Access loadData from context

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

            await loadData();
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
