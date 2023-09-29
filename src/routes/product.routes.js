const { CreateProduct, GetProductById, GetAllProducts, DeleteProductById, UpdateProductById } = require("../Controllers/product.controller");
const { Verifyjwt, VerifyAdmin } = require("../middlewares/auth.middleware");
    module.exports = (app)=>{
    app.post("/products",[Verifyjwt,VerifyAdmin],CreateProduct)
    app.put("/products/:id",[Verifyjwt,VerifyAdmin],UpdateProductById)
    app.delete("/products/:id",[Verifyjwt,VerifyAdmin],DeleteProductById)
    app.get("/products",[Verifyjwt],GetAllProducts)
    app.get("/products/:id",GetProductById)
    }
    