import categoryModel from "../model/category.model";

const CreateCategory = async (req, res) => {
    try {
        const {name} = req.body
        
        if(!name) 
            return res.status(400).json({
                success: false,
                message: "Vui lòng không để trống trường này."
            })

        const category = await categoryModel.findOne({ name })
        if(category) 
            return res.status(400).json({
                success: false,
                message: "Danh mục này đã tồn tại."
            })
        
        const addCategory = new categoryModel({
            name
        })

        await addCategory.save()

        return res.status(200).json({
            success: true,
            message: "Thêm danh mục mới thành công."
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            mess: err.message
        })
    }
}

export default {
    CreateCategory
}