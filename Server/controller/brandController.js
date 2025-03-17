import brandModel from "../model/brand.model.js";

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({
        success: false,
        message: "Vui lòng không để trống trường này.",
      });

    const brand = await brandModel.findOne({ name });
    if (brand)
      return res.status(400).json({
        success: false,
        message: "Thương hiệu này đã tồn tại.",
      });
    const addCategory = new brandModel({
      name,
    });

    await addCategory.save();

    return res.status(200).json({
      message: "Thêm thương hiệu mới thành công.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    return res.status(200).json({
      brands,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteItemBrand = async (req, res) => {
  try {
    const id = req.params.id;
    await brandModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Xóa thương hiệu thành công.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateItemBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const itemBrand = await brandModel.findById(id);
    itemBrand.name = name || itemBrand.name;
    await itemBrand.save();
    return res.status(200).json({
      message: "Cập nhật thương hiệu thành công."
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getItemBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const itemBrand = await brandModel.findById(id);
    return res.status(200).json({
      itemBrand,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  createBrand,
  getAllBrands,
  deleteItemBrand,
  updateItemBrand,
  getItemBrand,
};
