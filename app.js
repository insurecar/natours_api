const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const gdUserRouter = require("./routes/gdUserRoute");
const app = express();
const fs = require("fs");
const {
  getUserByName,
  getAllGdUsers,
} = require("./controllers/gdUserController");

const getAllGDUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/gdUsers.json`)
);

// 1_ Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //alows us to open html files in public folder

app.use((req, res, next) => {
  console.log("Hello from the middleware 😀😀😀😀😀");

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (req, res) => {
//   //   res.status(200).send("Hello from the server side...");
//   res
//     .status(404)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint");
// });

//3_ ROUTES

// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

// app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", deleteTour);

// app.get("/api/v1/gd-users", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: getAllGDUsers.length,
//     data: {
//       gdusers: getAllGDUsers,
//     },
//   });
// });

app.get("/api/v1/gd-users", getAllGdUsers);
app.get("/api/v1/gd-users/:lastname", getUserByName);

app.use("/api/v1/gd-users", gdUserRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//4_ START SERVER

module.exports = app;
