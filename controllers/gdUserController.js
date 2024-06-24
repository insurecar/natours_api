const GDUser = require("../models/gdModel");

exports.getAllUsers = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((query) => delete queryObj[query]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    let query = GDUser.find(queryStr);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("id");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v"); // excluded property
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10000;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await GDUser.countDocuments();
      if (skip >= numTours) throw new Error(`This page doesn't exist`);
    }

    const gdusers = await query;
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
