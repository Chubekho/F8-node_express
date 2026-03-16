const { VERIFY_EMAIL_TOKEN_TTL_SECONDS } = require("../configs/constants");
const { emailVerifySecret } = require("../configs/jwt");
const transporter = require("../configs/nodemailer");
const jwt2 = require("../utils/jwt2");

class EmailService {
  async sendVerifyEmail(user) {
    const now = Math.floor(Date.now() / 1000);
    const verifyEmailToken = jwt2.sign(
      {
        sub: user.id,
        exp: now + VERIFY_EMAIL_TOKEN_TTL_SECONDS,
      },
      emailVerifySecret,
    );
    const info = await transporter.sendMail({
      from: '"Mr.Epstein" <donaldtheduck@gmail.com>',
      to: user.email,
      subject: "Xác thực email",
      html: `<p><a href="http://localhost:5173?token=${verifyEmailToken}">Click here !!!</a></p>`, // HTML version of the message
    });
    return info;
  }
}

module.exports = new EmailService();
