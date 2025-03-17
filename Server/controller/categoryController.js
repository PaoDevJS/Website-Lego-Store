import categoryModel from "../model/category.model.js";

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

const GetAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        return res.status(200).json({
            success: true,
            categories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteItemCategory = async (req, res) => {
    try {
        const id = req.params.id
        await categoryModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Xóa danh mục thành công."
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getItemCategory = async (req, res) => {
    try {
        const id = req.params.id
        const itemCategory = await categoryModel.findById(id)
        return res.status(200).json({
            itemCategory
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
} 

const updateItemCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body
        const itemCategory = await categoryModel.findById(id)
        itemCategory.name = name || itemCategory.name
        await itemCategory.save()
        return res.status(200).json({
            message: "Cập nhật danh mục thành công."
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

export default {
    CreateCategory,
    GetAllCategories,
    deleteItemCategory,
    getItemCategory, 
    updateItemCategory
}