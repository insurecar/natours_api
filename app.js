const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const gdUserRoute = require("./routes/gdUserRoute");
const app = express();

// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }
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

app.use("/api/v1/tourstree", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/gdusers", gdUserRoute);

module.exports = app;
