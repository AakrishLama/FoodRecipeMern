// routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const food = require("../models/Food");
const fs = require("fs");

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "../public/fotos";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath); // Create upload folder if it doesn't exist
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

router.post("/createfood", upload.single("image"), async (req, res) => {
    try {
        // Check if req.file exists
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required.' });
        }

        // Create food item
        const foodItem = await food.create({
            name: req.body.name,
            categoryName: req.body.categoryName,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            ingredients: JSON.parse(req.body.ingredients), // Parse ingredients if they are sent as JSON
            image: req.file.path  // Store the image path if uploaded
        });
        
        res.json({ success: true, foodItem });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
});

router.post("/getFood", async(req, res)=>{
    try {
        res.send([global.cat, global.food])
    } catch (error) {
        console.error(error.message);
    }
})

router.post("/deleteFood", async (req, res) => {
    const  foodId  = req.body.id; // Get the foodId from the request body

    if (!foodId) {
        return res.status(400).json({ success: false, message: 'Food ID is required.' });
    }

    try {
        // Find the food item by ID and remove it
        const deletedFoodItem = await food.findByIdAndDelete(foodId);

        if (!deletedFoodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found.' });
        }

        res.json({ success: true, message: 'Food item deleted successfully.', deletedFoodItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
});

router.post("/updateFood", upload.single("image"), async (req, res) => {
    const foodId = req.body.id; // Get the foodId from the request body

    if (!foodId) {
        return res.status(400).json({ success: false, message: 'Food ID is required.' });
    }

    try {
        // Prepare the update object
        const updateData = {
            name: req.body.name,
            categoryName: req.body.categoryName,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            ingredients: JSON.parse(req.body.ingredients) // Assuming ingredients are sent as a JSON string
        };

        // Check if a new image was uploaded
        if (req.file) {
            updateData.image = req.file.path; // Update the image path if a new image is uploaded
        }

        // Find the food item by ID and update it
        const updatedFoodItem = await food.findByIdAndUpdate(foodId, updateData, { new: true });

        if (!updatedFoodItem) {
            return res.status(404).json({ success: false, message: 'Food item not found.' });
        }

        res.json({ success: true, message: 'Food item updated successfully.', updatedFoodItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
});


module.exports = router;
