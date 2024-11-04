import React, { createContext, useContext, useEffect, useState } from 'react';

const FoodContext = createContext();

// Custom hook to use FoodContext
export const useFood = () => useContext(FoodContext);

// Provider component
export const FoodProvider = ({ children }) => {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

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

    useEffect(() => {
        loadData();
    }, []);

    return (
        <FoodContext.Provider value={{ foodCat, foodItem, loadData }}>
            {children}
        </FoodContext.Provider>
    );
};