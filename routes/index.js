const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { verifyGoogle } = require("../middlewares/verifyGoogle");

router.route("/login").post(verifyGoogle, login);

module.exports = router;
