const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/users.js");
const app = express();
const port = 3000;

app.use(express.json()); // Correct

const mongoDBUrl = "mongodb://localhost:27017/node_crud";

// Connect to MongoDB
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB on localhost.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getAllProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); // Send a JSON response with the created product
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/getProductById/:id", async (req, res) => {
    try {
        const{id}=req.params;
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.put('/product/:id',async(req,res)=>
{
    try{
        const{id}=req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product)
        {
            return res.status(404).json({message:`cannont find any product with Id ${id}`})
        }
        res.status(200).json(product)
    }
        catch(error)
        {
            res.status(500).json({ message: error.message });
        }

  
})


app.delete('/product/:id',async(req,res)=>
{
    try{
        const{id}=req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product)
        {
            return res.status(404).json({message:`cannont find any product with Id ${id}`})
        }
        res.status(200).json(product)
    }
        catch(error)
        {
            res.status(500).json({ message: error.message });
        }

  
})









app.get("/blog", (req, res) => {
  res.send("hi!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
