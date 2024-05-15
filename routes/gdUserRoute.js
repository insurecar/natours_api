const express = require("express");
const router = express.Router();

const {
  getUserByName,
  getAllGdUsers,
  getUserByNameAndSurname,
} = require("../controllers/gdUserController");

router.route("/").get(getAllGdUsers);
router.route("/:name").get(getUserByName);
router.route("/:name/:surname").get(getUserByNameAndSurname);

module.exports = router;
