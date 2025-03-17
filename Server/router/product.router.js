import productController from "../controller/productController.js"
import uploadFile from "../middleware/multer.js"

const ProductRouter = (main, route) => {
    route.post("/add-product", uploadFile.array("upload_files_product", 30), productController.createProduct)
    route.get("/get-all-products", productController.getAllProducts)
    route.delete("/delete-item-product/:id", productController.deleteItemProduct)
    route.get("/get-item-product/:id", productController.getItemProduct)
    route.put("/update-item-product/:id", uploadFile.array("upload_files_product", 30), productController.updateItemProduct)

    main.use('/api/product', route)
}

export default ProductRouter
