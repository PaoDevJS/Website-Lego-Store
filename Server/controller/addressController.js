import addressModel from "../model/address.model.js";

export const isCreateAddress = async (req, res) => {
  try {
    const { userId, username, address, phone } = req.body;

    const exitAddress = await addressModel.findOne({ userId });

    if (!exitAddress) {
      const newAddress = new addressModel({
        userId,
        addresses: [
          {
            username,
            address,
            phone,
          },
        ],
      });
      await newAddress.save();
      return res.status(200).json({ message: "Thêm địa chỉ mới thành công!" });
    }

    await addressModel.updateOne(
      { userId },
      {
        $push: {
          addresses: [
            {
              username,
              phone,
              address,
            },
          ],
        },
      }
    );

    await exitAddress.save();
    return res.status(200).json({ message: "Thêm địa chỉ mới thành công!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại" });
  }
};

export const isGetAddressAll = async (req, res) => {
  try {
    const userId = req.id;
    const listAddress = await addressModel.findOne({ userId });
    return res.status(200).json(listAddress);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại" });
  }
};

export const isDeleteAddress = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const address = await addressModel.findOne({ userId });

    const addressIndex = address.addresses.findIndex(
      (p) => p._id.toString() === id
    );
    if (addressIndex === -1) {
      return res.status(404).json("Địa chỉ không tồn tại!");
    }

    address.addresses.splice(addressIndex, 1);

    await address.save();

    return res.status(200).json({ message: "Xóa địa chỉ thành công!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại" });
  }
};

export const isGetItemAddress = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const address = await addressModel.findOne({ userId });

    // Tìm sản phẩm trong giỏ hàng
    const addressIndex = address.addresses.filter(
      (p) => p._id.toString() === id
    );
    if (!addressIndex) {
      return res.status(404).json("Sản phẩm không tồn tại!");
    }

    return res.status(200).json(addressIndex);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại" });
  }
};

export const isUpdateItemAddress = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { username, phone, address } = req.body

    const user = await addressModel.findOne({ userId })
    const addressIndex = user.addresses.findIndex(p => p._id.toString() === id )
    if(addressIndex === -1)
        return res
            .status(404)
            .json({message: "Địa chỉ không tồn tại!"})
    
    if(!username || !phone || !address) 
        return res
            .status(404)
            .json({message: "Vui lòng điền đủ các thông tin!"})

    user.addresses[addressIndex].username = username
    user.addresses[addressIndex].phone = phone
    user.addresses[addressIndex].address = address

    await user.save()

    return res
        .status(200)
        .json({message: "Cập nhật địa chỉ `"})

  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Uiii, có lỗi rồi. Vui lòng thử lại" });
  }
};
