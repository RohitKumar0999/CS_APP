const Product = require("../models/product.model");

const CreateProduct = (req,res)=>{

    const NewProduct = new Product(req.body);
      NewProduct.save()
    .then((data)=>res.status(200).send("Product Created Successfully"))
    .catch((err)=>res.send(err));
  }

  
const UpdateProductById = (req,res)=>{

    const id = req.params.id;
    const update = req.body;
    Product.findByIdAndUpdate(_id,update,{new:true})
    .then(data=>res.send(data))
    .catch(err=>res.send({message:err.message||"Internal Server Error"}))
  }


const DeleteProductById = (req,res)=>{
    const id = {id:req.params.id}
    Product.deleteOne(id)
    .then(data=>res.send("Product deleted Successfully"))
    .catch(err=>res.send({message:err.message||"Internal Server Error"}))
  }

const GetAllProducts = (req,res)=>{
    Product.find({})
    .then(data=>{
      res.send(data)})
    .catch(err=>res.send(err||"Intenal Server Error"))
    }

const GetProductById = (req,res)=>{
    const Id = req.params.id;
     Product.findById(Id)
     .then(data=>{
      if(!data)
      res.send("Invalid Product ID")
      res.send(data)})
     .catch(err=>res.send({message : err.message || "Internal Server Error"}));
    }


module.exports={
    CreateProduct,GetAllProducts,GetProductById,DeleteProductById,UpdateProductById
}