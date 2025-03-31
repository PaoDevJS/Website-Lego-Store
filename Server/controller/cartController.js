import cartModel from "../model/cart.model.js";

export const isCreateCart = async (req, res) => {
  try {
    const { productId, userId, stock } = req.body;

    if (!productId || !userId || !stock) {
      return res.status(400).json("Thiếu thông tin sản phẩm hoặc người dùng!");
    }

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      // Nếu chưa có giỏ hàng, tạo mới
      const newCart = new cartModel({
        userId: userId,
        products: [
          {
            productId,
            quantity: stock,
          },
        ],
      });

      await newCart.save();
      return res.status(200).json("Thêm vào giỏ hàng thành công!");
    }
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      // Nếu đã có, cập nhật số lượng
      cart.products[productIndex].quantity += stock;
    } else {
      // Nếu chưa có, thêm mới
      await cartModel.updateOne(
        {userId},
        {$push: {
          products: [
            { productId, quantity: stock }
          ]
        }}
      )
    }

    await cart.save();
    return res.status(200).json("Thêm giỏ hàng thành công!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const isGetCartAll = async (req, res) => {
  try {
    const carts = await cartModel.findOne({ userId: req.id}).populate("products.productId")
    return res.status(200).json(carts.products)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const isDeleteItemProductInTheCart = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.body.userId

    // Tìm giỏ hàng của user
    const cart = await cartModel.findOne({ userId })
    if (!cart) {
      return res.status(404).json("Giỏ hàng không tồn tại!");
    }
    // Tìm vị trí sản phẩm trong giỏ hàng
    const productIndex = cart.products.findIndex(p => p._id.toString() === id);

    if (productIndex === -1) {
      return res.status(404).json("Sản phẩm không tồn tại trong giỏ hàng!");
    }

    // Xóa sản phẩm khỏi giỏ hàng
    cart.products.splice(productIndex, 1);

    // Cập nhật giỏ hàng
    await cart.save()

    // Cập nhật giỏ hàng
    await cart.save()

    return res.status(200).json("Xóa sản phẩm khỏi giỏ hàng thành công!" );
  } catch (error) {
    return res.status(500).json(error.message)
  }
}