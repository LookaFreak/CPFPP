const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
// const ENV = require("./ENV/environment");
const path = require('path')
// const Template = require('../template/forgotPassword.html')

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env?.MAIL_USERNAME}`,
        pass: `${process.env?.MAIL_PASSWORD}`,
    },
});

function sendMail(mailOptions, replacements) {

    const source = fs.readFileSync(path.join(__dirname + "./../template/forgotPassword.html"), 'utf-8').toString();
    const htmlTemplate = handlebars.compile(source);
    const htmlToSend = htmlTemplate(replacements);

    transporter.sendMail({ html: htmlToSend, ...mailOptions }, function (error, info) {
        if (error) {
            console.log("Email error: " + error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendMail;