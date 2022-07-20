const express = require("express");
const router = express.Router();
const {
  resposeToSlack,
  resposeToSlackOauth,
  resposeToSlackHelpOrder,
} = require("../controllers/slackController");

router.route("/").post(resposeToSlack);
router.route("/oauth").get(resposeToSlackOauth);
router.route("/order/help").get(resposeToSlackHelpOrder);
router.route("/order/subscribe").get(resposeToSlackHelpOrder);

module.exports = router;
