import brandController from "../controller/brandController.js"

const brandRouter = (main, route) => {
    route.post("/add-brand", brandController.createBrand)
    route.get("/get-all-brands", brandController.getAllBrands)
    route.delete("/delete-item-brand/:id", brandController.deleteItemBrand)
    route.put("/update-item-brand/:id", brandController.updateItemBrand)
    route.get("/get-item-brand/:id", brandController.getItemBrand)

    main.use("/api/brand", route)
}

export default brandRouter