const nodeMailer = require("nodemailer");
const config = require("../utils/config");

const sendEmail = async (body) => {
  var transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: config.mailTrap.user,
      pass: config.mailTrap.password,
    },
  });
  transporter.verify().then(console.log).catch(console.error);
  let mailOptions = {
    from: body.from,
    to: body.to,
    subject: body.subject,
    text: body?.text || "",
    html: body?.html || "",
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      return true;
    } else {
      res.json({
        success: 400,
        message: error.message,
      });
      return false;
    }
  });
};

module.exports = {
  sendEmail,
};
