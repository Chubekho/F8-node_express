const transporter = require("../configs/nodemailer");

class EmailService {
  async sendVerifyEmail(email, subject = "Xác thực email", token) {
    const info = await transporter.sendMail({
      from: '"Mr.Epstein" <donaldtheduck@gmail.com>',
      to: email,
      subject: subject,
      html: `<p><a href="http://localhost:5173?token=${token}">Click here !!!</a></p>`, // HTML version of the message
    });
    return info;
  }
}

module.exports = new EmailService();
