const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const products = require('./products.js');
require('dotenv').config();
const dbConfig = require('./src/config/db.config.js');
const PORTConfig = require('./src/config/PORT.config.js');
const app = express();
var cachegoose = require('cachegoose');
const { configDotenv } = require('dotenv');

// const port = 3000;

console.log(process.env);
app.use(bodyParser.json()); //Here we are try/take the data that passed in the req object of route for use in middleware

mongoose.connect(dbConfig.DB_URL)
.then((res)=>{
  console.log("You are Successfully connected to the database");
  
})
.catch(err=>console.log("Couldn't connect to database"));


cachegoose(mongoose);
require("./src/routes/product.routes")(app);
require("./src/routes/auth.routes.js")(app);
require("./src/routes/user.routes.js")(app);
require("./src/routes/ticket.routes.js")(app);
app.listen(PORTConfig.PORT, () => {
console.log(`Example app listening on port ${PORTConfig.PORT}`)
})
// app.post("/products",(req,res)=>{
 
//   const NewProduct = new Product(req.body);

//   NewProduct.save()
//   .then((data)=>res.status(200).send("Product Created Successfully"))
//   .catch((err)=>res.send(err));
// })

// app.get("/products",(req,res)=>{

// Product.find({})
// .then(data=>{
//   res.send(data)})
// .catch(err=>res.send(err||"Intenal Server Error"))
// })


// In this Route we will find get an array of object that matches with the given array of monogoDb.
// app.get("/products/:id",(req,res)=>{
//   const id = req.params.id;
//    Product.find({_id:id})
//    .then(data=>res.send(data))
//    .catch(err=>res.send(err))
//   })

        // This Route will Return an single object that match with the given MongoDb Id in Params.
// app.get("/products/:id",(req,res)=>{
// const Id = req.params.id;
//  Product.findById(Id)
//  .then(data=>{
//   if(!data)
//   res.send("Invalid Product ID")
//   res.send(data)})
//  .catch(err=>res.send({message : err.message || "Internal Server Error"}));
// })

// app.put("/products/:id",(req,res)=>{
//   const filter = {_id: req.params.id};
//   const update = req.body;
  
//    Product.findOneAndUpdate(filter,update)
//    .then(data=>{
  
//      res.send(data);
     
//    })
//    .catch(err=>res.send({message:err.message||"Internal Server Error"}))
// })


// app.put("/products/:id",(req,res)=>{

//   const id = req.params.id;
//   const update = req.body;
//   Product.findByIdAndUpdate(id,update,{new:true})
//   .then(data=>res.send(data))
//   .catch(err=>res.send({message:err.message||"Internal Server Error"}))
// })


// app.delete("/products/:id",(req,res)=>{
//   const id = {_id:req.params.id}
//   Product.deleteOne(id)
//   .then(data=>res.send("Product deleted Successfully"))
//   .catch(err=>res.send({message:err.message||"Internal Server Error"}))
// })



// app.use((req,res,next)=>{
//   console.log("WELCOME  INSID  THE MIDDLEWARE");
//   console.log(req.body);
//   next();
// })

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



// app.get('/about',(req,res)=>{
//     res.send('<h1>This is about page</h1>')
// })

// app.get("/products",(req,res)=>{
//   res.send(products);     
//   // res.send("Request Recieved");

// }
// )

// app.get("/products/:id",(req,res)=>{
//   const product = products.productsData.find((product)=>product.id==req.params.id);
//     console.log(product);
//     if(product===undefined){
//       res.status(404).send({error:`The Product with id ${req.params.id} is not available in the database`})
//     }
// res.send(product);
// })

// app.post("/products",(req,res)=>{
//   products.productsData.push(req.body);
//   res.status(201).send({message:"Product Created Successfully"})
// })

// app.delete("/products/:id",(req,res)=>{
//   // console.log("Trying to delete the product");
//   const newProducts = products.productsData.filter((product)=>product.id != req.params.id);
//   products.productsData=newProducts;
//   res.status(200).send(`Product with UserId ${req.params.id} is Deleted Successfully`);
// })


