const fs = require("fs");

const getAllGDUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/gdUsers.json`)
);

exports.getUserByName = (req, res) => {
  console.log(req.params);
  const findUsers = getAllGDUsers.filter(
    (user) =>
      user?.firstName.toLowerCase() === req.params?.lastname.toLowerCase()
  );
  res.status(200).json({
    status: "success",
    results: findUsers.length,
    data: {
      users: findUsers,
    },
  });
};

exports.getAllGdUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: getAllGDUsers.length,
    data: {
      users: getAllGDUsers,
    },
  });
};
