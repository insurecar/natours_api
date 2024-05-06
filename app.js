const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   //   res.status(200).send("Hello from the server side...");
//   res
//     .status(404)
//     .json({ message: "Hello from the server side", app: "Natours" });
// });

// app.post("/", (req, res) => {
//   res.send("You can post to this endpoint");
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours: tours },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const tour = tours.filter((tour) => +tour.id === +req.params.id);
  if (tour.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const tour = { ...req.body, id: newId };
  const updatedTours = [...tours, tour];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(201).json({
        status: " success",
        data: {
          tour,
        },
      });
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
