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

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//   });
// }

(async function main() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
