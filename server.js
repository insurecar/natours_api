const mongoose = require("mongoose");

const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");

dotenv.config({
  path: "config.env",
});
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// const client = new MongoClient(DB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   } finally {
//     await client.close();
//   }
// }
// connectToDatabase();
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
}
console.log(process.env.DATABASE_PASSWORD);

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
