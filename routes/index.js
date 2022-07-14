const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { verifyGoogle } = require("../middlewares/verifyGoogle");
const { verifyToken } = require("../middlewares/auth");
const { getError } = require("../controllers/userController");

router.route("/login").post(verifyGoogle, login);
router.route("/slack").post(getError);
router.route("/error/:error_id").get(verifyToken, getError);

module.exports = router;
