const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service:'gmail',
    auth: {
      // user: process.env.EMAIL_USERNAME,
      // pass: process.env.EMAIL_PASSWORD,
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const message = {
    from: "ChatApp <manishaggarwal8304@gmail.com>",
    to: options.to,
    subject: options.subject,
    text: options.text,
  };
  await transporter.sendMail(message);
};

module.exports = sendMail;
