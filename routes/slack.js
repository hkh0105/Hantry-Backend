const express = require("express");
const router = express.Router();
const {
  resposeToSlack,
  resposeToSlackOauth,
  resposeToSlackHelpOrder,
} = require("../controllers/slackController");

router.route("/").post(resposeToSlack);
router.route("/oauth").get(resposeToSlackOauth);
router.route("/order/help").post(resposeToSlackHelpOrder);
router.route("/order/subscribe").post(resposeToSlackHelpOrder);

module.exports = router;
