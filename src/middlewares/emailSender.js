const transporter = require('../configs/email');

transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log('READY!');
        console.log(success);
    }
});

const mailSender = (req, res) => {
    const { email: to, otp } = req.body;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to,
        subject: 'Kode OTP',
        text: `Masukan kode OTP sebagai berikut: ${otp}`,
    };

    transporter.sendMail(mailOptions).catch((err) => {
        console.log(err);
    });
};

module.exports = mailSender;
