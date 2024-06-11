const express = require("express");
const {
  getAllUsers,
  getUserBySurname,
  getUserBySurnameAndName,
  getUsersByLocation,
} = require("../controllers/gdUserController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/location/:location").get(getUsersByLocation);
router.route("/:lastName").get(getUserBySurname);
router.route("/:lastName/:firstName").get(getUserBySurnameAndName);

module.exports = router;
