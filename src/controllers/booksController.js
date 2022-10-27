const BooksModel = require("../models/userModel");
const createBook = async function (req, res) {
  let data = req.body;
  let savedData = await BooksModel.create(data);
  res.send({ msg: savedData });
};

const getBooksData = async function (req, res) {
  let allBooks = await BooksModel.find();
  res.send({ msg: allBooks });
};

const bookList = async function (req, res) {
  let allBooks = await BooksModel.find().select({
    bookName: 1,
    authorName: 1,
    _id: 0,
  });
  res.send({ msg: allBooks });
};

const getBooksInYear = async function (req, res) {
  let years = req.body.year;
  let allBooks = await BooksModel.find({ year: years });
  res.send({ msg: allBooks });
};

const getParticularBooks = async function (req, res) {
  let toFind = req.body;
  let allBooks = await BooksModel.find(toFind);
  res.send({ msg: allBooks });
};

const getXINRBooks = async function (req, res) {
  let allBooks = await BooksModel.find({
    "prices.indianprice": { $in: ["Rs 100", "Rs 200", "Rs 500"] },
  });
  res.send({ msg: allBooks });
};

const getRandomBooks = async function (req, res) {
  let allBooks = await BooksModel.find({
    $or: [{ stockAvailable: true }, { totalPages: 500 }],
  });
  res.send({ msg: allBooks });
};

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getParticularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;
