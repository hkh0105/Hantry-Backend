const { WebClient } = require("@slack/web-api");

const sendMessageToSlack = async (channelId, error) => {
  const id = channelId;
  const API_TOKEN = process.env.SLACK_ACCESS_TOKEN;
  const client = new WebClient(API_TOKEN);

  try {
    const result = await client.chat.postMessage({
      channel: id,
      text: `Hantry : a ${error.type} error is occured, ${error.message}`,
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendMessageToSlack };
