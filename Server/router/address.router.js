import { isCreateAddress, isDeleteAddress, isGetAddressAll, isGetItemAddress, isUpdateItemAddress } from "../controller/addressController.js"
import { verifyToken } from "../middleware/verifyToken.js"


export const addressRouter = (main, route) => {
    route.post("/create-address", isCreateAddress)
    route.get("/get-all", verifyToken, isGetAddressAll)
    route.delete("/delete-address/:id&:userId", isDeleteAddress)
    route.get("/get-item-address/:id&:userId", isGetItemAddress)
    route.put("/update-item-address/:id&:userId", isUpdateItemAddress)


    main.use("/api/address", route)
}