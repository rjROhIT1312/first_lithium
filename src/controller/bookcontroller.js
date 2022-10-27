const bookmodel1 = require("../models/mybookmodel");
const bookmodel2 = require("../models/AuthorModel");

const createmybook = async function (req, res) {
  let data = req.body;
  let savedData = await bookmodel1.create(data);
  res.send({ msg: savedData });
};

const createauthor = async function (req, res) {
  let data = req.body;
  let savedData = await bookmodel2.create(data);
  res.send({ msg: savedData });
};

const getbookbychetan = async function (req, res) {
  let arr = await bookmodel2.find({ author_name: "Chetan Bhagat" });
  const [obj] = arr;
  let id = obj.author_id;

  // const{id1,id2,an,a,add}=obj
  // console.log(id2)
  let allbooks = await bookmodel1.find({ author_id: id });
  res.send({ msg: allbooks });
};

const TwoStUpdate = async function (req, res) {
  let obj = await bookmodel1.findOne({ name: "Two states" });
  let id = obj.author_id;
  let objj = await bookmodel2
    .findOne({ author_id: id })
    .select({ author_name: 1, _id: 0 });
  let allBooks = await bookmodel1
    .findOneAndUpdate(
      { name: "Two states" }, //condition
      { $set: { price: 150 } }, //update in data
      { new: true }
    )
    .select({ price: 1, _id: 0 });

  res.send({ msg: [objj, allBooks] });
};

const middle = async function (req, res) {
  let allbooks = await bookmodel1.find({ price: { $gte: 50, $lte: 100 } });
  let a = [];

  for (i of allbooks) {
    let objjj = await bookmodel2
      .findOne({ author_id: i.author_id })
      .select({ author_name: 1, _id: 0 });

    a.push(i);
    a.push(objjj);
  }

  res.send({ msg: a });
};

module.exports.createmybook = createmybook;
module.exports.createauthor = createauthor;
module.exports.getbookbychetan = getbookbychetan;
module.exports.TwoStUpdate = TwoStUpdate;
module.exports.middle = middle;
