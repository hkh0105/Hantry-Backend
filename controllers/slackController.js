const CustomeError = require("../utils/CustomError");
const asyncCatcher = require("../utils/asyncCatcher");
const request = require("request");
const {
  saveSlackWorkSpace,
  saveSlackUserDsn,
} = require("../service/slackService");
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
  console.log(req);
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
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const oauthToken = JSON.parse(body).access_token;
        const teamId = JSON.parse(body).team.id;

        saveSlackWorkSpace(oauthToken, teamId);

        res.send("Success, Thank you for using Hantry");
      }
    },
  );
});

const responseToSlackDsnOrder = asyncCatcher(async (req, res, next) => {
  const channelId = req.body.channel_id;
  const teamId = req.body.team_id;
  const responseUrl = req.body.response_url;
  const dsn = req.body.text;

  const slackUser = await saveSlackUserDsn(channelId, teamId, dsn);

  slackUser
    ? res.status(200).json({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Success.*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Now Check your project's Error on Hantry",
            },
          },
        ],
      })
    : null;
});

const resposeToSlackHelpOrder = asyncCatcher(async (req, res, next) => {
  res.status(200).json({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Orider List.*",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "/hantry_subscribe <your dsn>  update your dsn and Channel",
        },
      },
    ],
  });
});

module.exports = {
  resposeToSlack,
  resposeToSlackOauth,
  resposeToSlackHelpOrder,
  responseToSlackDsnOrder,
};
