import productModel from "../model/product.model.js";


const createProduct = async (req, res) => {
    try {
        const images =  req.files
        const {name, price, desc, stock, categories, brands} = req.body
        const arrImages = []
        images.map(item => {
            arrImages.push(item.filename)
        })

        if(!name || !price || !desc || !stock || !categories || !brands) 
            return res.status(400).json({
                message: 'Vui lòng không để trống trường này.'
            })

        const product = await productModel.findOne({ name })
        if(product)
            return res.status(400).json({
                message: "Sản phẩm này đã tồn tại."
            })
        const createProduct = new productModel({
            name,
            desc,
            price,
            stock,
            categories, 
            brands,
            images: arrImages
        })

        await createProduct.save()
         return res.status(200).json({
            message: "Thêm sản phẩm mới thành công."
         })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        return res.status(200).json({ products })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteItemProduct = async (req, res) => {
    try {
        const id = req.params.id
        await productModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Xóa sản phẩm thành công."
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getItemProduct = async (req, res) => {
    try {
        const id = req.params.id
        const itemProduct = await productModel.findById(id)
        return res.status(200).json({
            itemProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateItemProduct = async (req, res) => {
    try {
        const id = req.params.id
        const images =  req.files
        const {name, price, desc, stock, categories, brands} = req.body
        const arrImages = []
        images.map(item => {
            arrImages.push(item.filename)
        })

        if(!name || !price || !desc || !stock || !categories || !brands) 
            return res.status(400).json({
                message: 'Vui lòng không để trống trường này.'
            })

        const itemProduct  = await productModel.findById(id)

        itemProduct.name = name || itemProduct.name
        itemProduct.price = price || itemProduct.price
        itemProduct.desc = desc || itemProduct.desc
        itemProduct.stock = stock || itemProduct.stock
        itemProduct.brands = brands || itemProduct.brands
        itemProduct.categories = categories || itemProduct.categories
        itemProduct.images = arrImages || itemProduct.images
        
        await itemProduct.save()

         return res.status(200).json({
            message: "Cập nhật sản phẩm thành công."
         })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export default {
    createProduct,
    getAllProducts,
    deleteItemProduct,
    getItemProduct,
    updateItemProduct
}