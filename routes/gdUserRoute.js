const express = require("express");
const router = express.Router();

const {
  getUserByName,
  getAllGdUsers,
} = require("../controllers/gdUserController");

router.route("/").get(getAllGdUsers);
router.route("/:surname").get(getUserByName);

module.exports = router;
