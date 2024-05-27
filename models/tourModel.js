const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "😞 A tour must have a name"],
    unique: true,
  },
  raiting: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: String,
    required: [true, "A tour must have a price"],
  },
});

exports.Tour = mongoose.model("tour", tourSchema);
