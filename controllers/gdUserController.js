const fs = require("fs");

const getAllGDUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/gdUsers.json`)
);

exports.getUserByName = (req, res) => {
  const findUsers = getAllGDUsers.filter(
    (user) => user?.firstName.toLowerCase() === req.params?.name.toLowerCase()
  );
  res.status(200).json({
    status: "success",
    results: findUsers.length,
    data: {
      users: findUsers,
    },
  });
};

exports.getUserByNameAndSurname = (req, res) => {
  console.log(req.params);
  const findedUsers = getAllGDUsers.filter(
    (user) =>
      user?.firstName.toLowerCase() === req.params?.name.toLowerCase() &&
      user?.lastName.toLowerCase() === req.params?.surname.toLowerCase()
  );
  res.status(200).json({
    status: "success",
    ["gd-users"]: findedUsers,
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
