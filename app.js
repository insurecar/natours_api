const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const AppError = require("./utils/appError");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const gdUserRoute = require("./routes/gdUserRoute");
const app = express();

// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //alows us to open html files in public folder
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/gdusers", gdUserRoute);

app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl}`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  const Reset = "\x1b[0m";
  const Bright = "\x1b[1m";
  const Dim = "\x1b[2m";
  const Underscore = "\x1b[4m";
  const Blink = "\x1b[5m";
  const Reverse = "\x1b[7m";
  const Hidden = "\x1b[8m";

  const FgBlack = "\x1b[30m";
  const FgRed = "\x1b[31m";
  const FgGreen = "\x1b[32m";
  const FgYellow = "\x1b[33m";
  const FgBlue = "\x1b[34m";
  const FgMagenta = "\x1b[35m";
  const FgCyan = "\x1b[36m";
  const FgWhite = "\x1b[37m";

  const BgBlack = "\x1b[40m";
  const BgRed = "\x1b[41m";
  const BgGreen = "\x1b[42m";
  const BgYellow = "\x1b[43m";
  const BgBlue = "\x1b[44m";
  const BgMagenta = "\x1b[45m";
  const BgCyan = "\x1b[46m";
  const BgWhite = "\x1b[47m";
  console.log(err.stack);
  console.log(`${FgRed}Цей текст червоний${Reset}`);
  console.log(`${FgRed}Цей текст червоний${Reset}`);
  console.log(`${FgGreen}Цей текст зелений${Reset}`);
  console.log(`${FgYellow}Цей текст жовтий${Reset}`);
  console.log(`${FgBlue}Цей текст синій${Reset}`);
  console.log(`${FgMagenta}Цей текст пурпурний${Reset}`);
  console.log(`${FgCyan}Цей текст блакитний${Reset}`);
  console.log(`${FgWhite}Цей текст білий${Reset}`);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
