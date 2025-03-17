import categoryController from "../controller/categoryController.js"

const CategoryRouter = (main, route) => {
    route.post("/add-category", categoryController.CreateCategory)
    route.get("/get-all-categories", categoryController.GetAllCategories)
    route.delete("/delete-item-category/:id", categoryController.deleteItemCategory)
    route.put("/update-item-category/:id", categoryController.updateItemCategory)
    route.get("/get-item-category/:id", categoryController.getItemCategory)

    main.use("/api/category", route)
}

export default CategoryRouter;