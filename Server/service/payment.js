import axios from "axios"
import orderModel from "../model/order.model.js";
import cartModel from "../model/cart.model.js";
import crypto from "crypto"


// Thanh toán
export const isPayment = async (res, amount, orderId, cartId) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  const accessKey = process.env.accessKey;
  const secretKey = process.env.secretKey;
  const partnerCode = "MOMO";
  const redirectUrl = "http://chatgpt.com/c/67ff3b69-dc60-8010-8db5-c82854d1900c";
  const ipnUrl = "https://49d1-2405-4803-fbb4-8080-912-e982-ddc8-f55d.ngrok-free.app/api/order/payment/momo-ipn";
  const requestType = "payWithMethod";
  var amount = amount ;
  var orderId = orderId;
  const orderInfo = `Thanh toán đơn hàng #${orderId}`;
  const requestId = orderId;
  const extraData = "";
  const orderGroupId = "";
  const autoCapture = true;
  const lang = "vi";

  //before sign HMAC SHA256 with format
  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    cartId,
    redirectUrl,
    ipnUrl,
    lang: lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupI: orderGroupId,
    signature,
  });
  
  // option for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  }

  try {
    const result = await axios(options)
    return result.data
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
        statusCode: 500,
        message: "Server error"
    })
  }
};

export const isHandleIpn = async (req, res) => {
  const { orderId, resultCode, transId } = req.body;
  console.log("body isHandleIpn >> ", req.body)
  console.log(" << Callback >> ")

  if (resultCode === 0) {
    console.log("Thanh toán thành công")
    await orderModel.findByIdAndUpdate(orderId, { payment: "Thanh toán thành công", transId })
    const order = await orderModel.findById(orderId).populate("products")
    console.log("order >>", order)
    const cart = await cartModel.findById(order.cartId)
    console.log("CartId >>", cart)
  } else {
    console.log("Thanh toán thất bại")
    await orderModel.findByIdAndUpdate(orderId, { payment: "Thanh toán thất bại" })
  }

}
