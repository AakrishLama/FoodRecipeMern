import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function AdminView(props) {
    const navigate = useNavigate();
    const cropImgPath = (msg) => {
        if (typeof msg === 'string') {
            // Handle "uploads/" path
            if (msg.includes("../public/fotos/")) {
                return msg.replace("../public/fotos/", "./fotos/");
            }
        } else {
            console.warn('msg is not a valid string:', msg); // Log a warning if msg is not valid
        }
        return '../pictures/example.png'; // Set a default image path
    };

    // Ensure props.Img is passed correctly, and use it htmlFor the crop function
    const imagePath = cropImgPath(props.select.image);
    const [foodName, setFoodName] = useState(props.select.name); // State for the food name
    const [foodCat, setFoodCat] = useState(props.select.categoryName);
    const [foodSD, setFoodSD] = useState(props.select.shortDescription);
    const [foodD, setFoodD] = useState(props.select.description);
    // Initialize foodIngredients with the correct structure
    const [foodIngredients, setFoodIngredients] = useState(props.select.ingredients);
    const [foodImg, setFoodImg] = useState(imagePath)
    const [outputURL, setOutputURL] = useState(imagePath)


    const deleteFood = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this food item?");
        if (!isConfirmed) {
            return; // Exit if the user clicked "Cancel"
        }
        let response = await fetch("http://localhost:9000/api/deleteFood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: props.select._id })
        });
        response = await response.json();
        console.log(response)
        navigate("/");
    };

    const handleIngredientChange = (index, event) => {
        const values = [...foodIngredients];
        values[index][event.target.name] = event.target.value; // Use 'name' attribute to identify input
        setFoodIngredients(values);
    };

    const removeIngredientField = (index) => {
        const values = [...foodIngredients];
        values.splice(index, 1);
        setFoodIngredients(values);
    };

    const addIngredientField = () => {
        setFoodIngredients([...foodIngredients, { name: '', quantity: '' }]);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFoodImg(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a preview URL
            console.log(imageUrl)
            setOutputURL(imageUrl)
        }
    }

    const updateFood = async () => {
        const isConfirmed = window.confirm("Are you sure you want to update this food item?");
        if (!isConfirmed) return; // Exit if the user clicked "Cancel"

        // Create FormData object to handle both text and file data
        const formData = new FormData();
        formData.append("id", props.select._id);
        formData.append("name", foodName);
        formData.append("categoryName", foodCat);
        formData.append("shortDescription", foodSD);
        formData.append("description", foodD);
        formData.append("ingredients", JSON.stringify(foodIngredients));

        // Append image if it's a file object
        if (foodImg instanceof File) {
            formData.append("image", foodImg);
        }

        try {
            const response = await fetch("http://localhost:9000/api/updateFood", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            // Handle response as needed
        } catch (error) {
            console.error("Error updating food:", error);
        }
    };



    return (
        <div>
            <div className="container" style={{ backgroundColor: "black" }}>
                <input type="file" accept="image/jpeg, image/jpg, image/png" className="form-control-file" id="inputPic" onChange={handleImage} />

                <img style={{ height: "10rem", width: "10rem", justifyContent: "center" }} src={outputURL} alt="incorrect filepath"></img>
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label><br></br>
                    <input value={foodName} onChange={(e) => setFoodName(e.target.value)}></input>
                    <hr></hr>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Category</label><br></br>
                    <select className="form-control" value={foodCat} onChange={(e) => setFoodCat(e.target.value)} required>
                        <option value="meat">Meat</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lactosefri">Lactosfri</option>
                        <option value="glutonfri">Glutonfri</option>
                        <option value="vegan">Vegan</option>
                    </select>
                    <hr></hr>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Ingredients</label><br></br>
                    {foodIngredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                name="name"
                                value={ingredient.name}
                                onChange={(event) => handleIngredientChange(index, event)}
                                placeholder="Ingredient Name"
                            />
                            <br></br>
                            <input
                                name="quantity"
                                value={ingredient.quantity}
                                onChange={(event) => handleIngredientChange(index, event)}
                                placeholder="Quantity"
                            />
                            <br></br>
                            {foodIngredients.length > 1 && (
                                <button type="button" onClick={() => removeIngredientField(index)}>
                                    Remove
                                </button>
                            )}
                            <hr />
                        </div>
                    ))}
                    {/* Button to add a new ingredient field */}
                    <button type="button" onClick={addIngredientField}>
                        Add Ingredient
                    </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Short Description</label>
                    <textarea className="form-control" rows="3" value={foodSD} onChange={(e) => setFoodSD(e.target.value)}></textarea>
                    <hr></hr>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Methods</label>
                    <textarea className="form-control" rows="3" value={foodD} onChange={(e) => setFoodD(e.target.value)}></textarea>
                    <hr></hr>
                </div>
            </div>
            <button onClick={deleteFood}>Delete {props.select._id}</button>
            <button onClick={updateFood}>Update {props.select._id}</button>
        </div>
    );
}
