const SlackUser = require("../model/SlackUser");

const saveSlackWorkSpace = async (accessToken, workspace) => {
  console.log(accessToken, workspace);
  const teamModel = {
    userId: workspace,
    token: accessToken,
  };

  const newTeam = await SlackUser.create(newTeam);
  await newTeam.save();

  return newTeam;
};

const saveSlackUserDsn = async (channelId, teamId, dsn) => {
  const slackUser = await SlackUser.findOne({ userId: teamId });
  if (!slackUser) return null;

  slackUser.channelId = channelId;
  slackUser.dsn = dsn;

  await slackUser.save();

  return slackUser;
};

module.exports = { saveSlackWorkSpace, saveSlackUserDsn };
