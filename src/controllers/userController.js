const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req,res) {
  try{
  let data = req.body;
  let savedData = await userModel.create(data);
  res.status(201).send({ msg: savedData });
  }catch(error){
      res.status(500).send({msg:error.message})
  }
};

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
  let token = await jwt.sign(
    { userId: user._id.toString() },
    "functionup-plutonium-very-very-secret-key"
  );
  res.status(200).send({ status: true, token: token });
  }catch(error){
    return res.status(400).send({msg:error.message})
  }
};

const getUserData = async function (req, res) {
  try{
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  let decodedToken = await jwt.verify(
    token,
    "functionup-plutonium-very-very-secret-key"
  );
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
  }catch(error){
  res.status(500).send({msg:error.message})
  }
};

const updateUser = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  let decodedToken = await jwt.verify(
    token,
    "functionup-plutonium-very-very-secret-key"
  );
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: userData },
    { new: true }
  );
  res.send({ status: updatedUser, data: updatedUser });
};

const deleteUser = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  let decodedToken = await jwt.verify(
    token,
    "functionup-plutonium-very-very-secret-key"
  );
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;

  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleated: true } },
    { new: true }
  );
  res.send({ status: updatedUser, data: updatedUser });
};

const userPosts = async function (req, res) {
  let message = req.body.message;
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });
  let decodedToken = await jwt.verify(
    token,
    "functionup-plutonium-very-very-secret-key"
  );
  let userToBeModified = req.params.userId;
  let userLoggedIn = decodedToken.userId;
  if (userToBeModified != userLoggedIn)
    return res.send({
      status: false,
      msg: "You are not authorised to do this",
    });
  let user = await userModel.findById(req.params.userId);
  if (!user) return res.send({ status: false, msg: "No such user exists" });
  let updatedPosts = user.posts;
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );
  return res.send({ status: true, data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.userPosts = userPosts;




//200 ok
//201 new created
//204 no content
//400 bad request 
//401 unauthorized
//403 Forbidden
//404 not found
//500 Internal Server Error