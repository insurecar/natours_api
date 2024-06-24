const GDUser = require("../models/gdModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIFeatures(GDUser.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const gdusers = await features.query;
    res.status(200).json({
      status: "success",
      length: gdusers.length,
      data: {
        gdusers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getUserBySurname = async (req, res) => {
  try {
    const lastName = req.params.lastName;
    const user = await GDUser.findOne({
      lastName: new RegExp(`^${lastName}$`, "i"),
    });
    res.status(200).json({
      status: "ok",
      user: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "",
      message: "fail",
    });
  }
};

exports.getUserBySurnameAndName = async (req, res) => {
  try {
    const { lastName } = req.params;
    const { firstName } = req.params;
    const user = await GDUser.findOne({
      lastName: new RegExp(`^${lastName}$`, "i"),
      firstName: new RegExp(`^${firstName}$`, "i"),
    });
    res.status(200).json({
      status: "afnjabfdh",
      user,
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: "User was not found",
    });
  }
};

exports.getUsersByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const locationIn = await GDUser.find({
      location: new RegExp(`^${location}$`, "i"),
    });
    res.status(203).json({
      message: "success",
      length: locationIn.length,
      users: locationIn,
    });
  } catch (err) {
    res.status(444).json({
      status: "fail",
      message: `Can't find this location asjfhsdhfbshf`,
    });
  }
};
