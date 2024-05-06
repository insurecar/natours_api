const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// 1_ Middleware
app.use(morgan("dev"));

app.use(express.json());

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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2_ ROUTE HANDLERS

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requstedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet deffined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet deffined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet deffined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet deffined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet deffined",
  });
};

//3_ ROUTES

// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

// app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

//4_ START SERVER
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
