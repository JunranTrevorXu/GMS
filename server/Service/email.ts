const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.fromEmail,
        pass: process.env.fromEmailPswd
    }
});

function sendEmail(to, subject, text): Promise<any> {
    const mailOptions = {
        from: process.env.fromEmail,
        to,
        subject,
        text
    };

    return new Promise<any>((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('Email error: ' + error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve();
            }
        });
    })
}

export default sendEmail;