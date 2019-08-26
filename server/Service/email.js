"use strict";
exports.__esModule = true;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.fromEmail,
        pass: process.env.fromEmailPswd
    }
});
function sendEmail(to, subject, text) {
    var mailOptions = {
        from: process.env.fromEmail,
        to: to,
        subject: subject,
        text: text
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Email error: ' + error);
                reject(error);
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve();
            }
        });
    });
}
exports["default"] = sendEmail;
