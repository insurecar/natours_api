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

app.patch("/api/v1/tours/:id", (req, res) => {
  const mathcingTour = tours.find((tour) => +tour.id === +req.params.id);
  if (mathcingTour.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const updatedTour = { ...mathcingTour, ...req.body };
  const updatedTours = tours.map((tour) =>
    +mathcingTour?.id === +tour.id ? updatedTour : tour
  );

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          tour: updatedTour,
        },
      });
    }
  );
});

app.delete("/api/v1/tours/:id", (req, res) => {
  const updatedTours = tours.filter((tour) => +req.params.id !== tour.id);

  if (updatedTours.length === tours.length) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
