const fs = require("fs");
const path = require("path");

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./../data/gdUsers.json"), "utf-8")
);
// console.log("😀😀😀😀😀😀", tours);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");
const GDUser = require("../../models/gdModel");

dotenv.config({
  path: "../../config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async function main() {
  try {
    await mongoose.connect(DB);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

// IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
/// I__M__P__P__O__R__T__A__N__T  to run this file with command node updated_DB/update.js --import or --delete
