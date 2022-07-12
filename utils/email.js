const nodemailer = require("nodemailer");

const sendEmail = (email, error) => {
  const transporter = nodemailer.createTransport({
    service: "Naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: process.env.NAVER_EMAIL_ID,
      pass: process.env.NAVER_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "hkh9601@naver.com",
    to: email,
    subject: "Error Occured",
    html:
      "<h1 style='color: crimson;'>Hantry에서 오류가 생겼음을 알립니다.</h1> <h2> 타입 : " +
      error.type +
      "</h2>" +
      "<h3 style='color: crimson;'>" +
      error.message +
      "</h3>",
  };

  transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
