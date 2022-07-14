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

const resposeToSlackOauth = (req, res, next) => {
  const code = req.body.code;
  console.log(req.body);
  console.log(code);
  const slackResponse = request.post(
    "https://slack.com/api/oauth.access",
    (data = {
      client_id: "아이디",
      client_secret: "시크릿",
      code: code,
    }),
  );

  const response = json.loads(slackResponse.text);
  const accessToken = response["access_token"];

  console.log(response);
  console.log(accessToken);
  res.json("auth success");
};

module.exports = { resposeToSlack, resposeToSlackOauth };
