const authorModel = require("../models/authorModel");
const orderModel = require("../models/order");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel1");



const createUser = async function (req, res) {
  let data = req.body;

  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

const createProduct = async function (req, res) {
  let data = req.body;

  let savedData = await productModel.create(data);
  res.send({ msg: savedData });
};

const createOrder = async function (req, res) {
  let userId= req.body.userId;
  let checkUserId = await userModel.findOne({ _id: userId});
  if (!checkUserId) {
    return res.send("Invalid user Id");
  }
  let proId = req.body.productId;
  let checkProduct = await productModel.findOne({ _id: proId });
  if (!checkProduct) {
    return res.send("Invalid product Id");
  }
 
  let productPrice = checkProduct.price;
  let data = req.body;
 
  data.isFreeAppUser = isFreeAppUser;
  if (data.isFreeAppUser == "true") {
    data.amount = 0;
    let savedData = await orderModel.create(data);
    return res.send(savedData);
  }

  let bal = checkUserId.balance;
  console.log(bal);
  if (productPrice > bal) {
    return res.send("Insufficient Balance");
  }
  let user1 = await userModel.findOneAndUpdate(
    { _id: userId},
    { $inc: { balance: -productPrice } },
    { new: true }
  );
  data.amount = productPrice;
  let ordercr = await orderModel.create(data);
  res.send({ msg: ordercr, user1 });
};

module.exports.createUser = createUser;
module.exports.createProduct = createProduct;
module.exports.createOrder = createOrder;
