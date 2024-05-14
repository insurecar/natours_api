const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const updatedTours = tours.filter((tour) => +req.params.id !== tour.id);

  if (updatedTours.length === tours.length) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requstedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
  const mathcingTour = tours.find((tour) => +tour.id === +req.params.id);

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
};

exports.deleteTour = (req, res) => {
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
};
