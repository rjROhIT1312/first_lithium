const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      unique: true,
      required: true,
    },
    prices: {
      indianPrice: String,
      europePrice: String,
    },
    year: { type: Number, default: 2021 },
    tags: [String],
    authorName: {
      type: String,
      required: true,
    },
    totalPages: Number,
    stockAvailable: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", bookSchema);