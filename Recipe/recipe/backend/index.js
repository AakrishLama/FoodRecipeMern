const express = require("express")
const app = express()
const port = 9000
const mongoDB = require("./db")
mongoDB();
app.use(express.json());        

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.use("/api",require("./Routes/CreateUser"));
app.use("/api", require("./Routes/CreateFood"))
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})