const mongoose = require("mongoose");

const URI = "mongodb+srv://aakrish32:vM016PIMvCcmfV3l@cluster0.4da6m.mongodb.net/recipe?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        // Connecting to MongoDB
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");

        // // Uncomment the following lines to fetch data
        const fetchData = await mongoose.connection.db.collection("categoryName").find({}).toArray();
        if (fetchData.length === 0) {
            console.log("No data found in the 'categoryName' collection.");
        } else {
            global.cat = fetchData;
        }
        const fetchFood = await mongoose.connection.db.collection("foods").find({}).toArray();
        if (fetchFood.length === 0){
            console.log("no food");
        }else{
            global.food = fetchFood;
            console.log( "foodITEM LENGTH:",fetchFood.length)

        }
        

    } catch (error) {
        console.error("Failed to connect to MongoDB or fetch data", error);
    }
};

module.exports = mongoDB;
