const CustomeError = require("../utils/CustomError");
const asyncCatcher = require("../utils/asyncCatcher");
const request = require("request");

const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

const resposeToSlack = (req, res, next) => {
  const challenge = req.body.challenge;

  res.status(200).json({ challenge: challenge });
};

const resposeToSlackOauth = asyncCatcher(async (req, res, next) => {
  if (!req.query.code) return;

  const code = req.query.code;
  const data = {
    form: {
      client_id: process.env.SLACK_CLIEND_ID,
      client_secret: process.env.SLACK_CLIEND_SECRET,
      code: code,
    },
  };

  const slackResponse = await request.post(
    "https://slack.com/api/oauth.v2.access",
    data,
  );

  console.log(slackResponse);

  // const response = JSON.parse(slackResponse).access_token;

  console.log(response);
  res.json(response);
});

module.exports = { resposeToSlack, resposeToSlackOauth };
