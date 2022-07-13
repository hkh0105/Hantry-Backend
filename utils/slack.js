const { WebClient } = require("@slack/web-api");

const sendMessageToSlack = async (channelId, error) => {
  const id = channelId;
  const API_TOKEN = "xoxb-2958854559602-3784303845606-kg5QV5GK275F77dDuGPxzVGD";
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
sendMessageToSlack("C03PE60A9D2", { type: "hello", message: "123123" });
module.exports = { sendMessageToSlack };
