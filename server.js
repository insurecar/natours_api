const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({
  path: "config.env",
});
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
}

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

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
});
const User = mongoose.model("User", userSchema); // "User - this entity will be created in mongodb"
const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  rating: 123,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log("💥💥💥💥", err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
