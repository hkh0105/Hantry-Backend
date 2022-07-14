const express = require("express");
const router = express.Router();
const {
  resposeToSlack,
  resposeToSlackOauth,
} = require("../controllers/slackController");

router.route("/").post(resposeToSlack);
router.route("/oauth").post(resposeToSlackOauth);

module.exports = router;
