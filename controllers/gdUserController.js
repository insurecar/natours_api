const GDUser = require("../models/gdModel"); // Необхідно, якщо ви використовуєте схему

exports.getAllUsers = async (req, res) => {
  const users = await GDUser.find();
  console.log(users);
  try {
    console.log();
    res.status(203).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
