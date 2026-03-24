const userModel = require("../models/user.model");
const emailService = require("../services/email.service");

async function dailyReport() {
  const userCount = await userModel.countNewUser();

  const date = new Date();
  date.setDate(date.getDate() - 1);
  const preDate = date.toISOString().slice(0, 10);

  await emailService.sendDailyReport(
    "lyzandat@gmail.com",
    `Daily report - ${preDate}`,
    userCount
  );

  console.log("Email sent successfully");
  
}

module.exports = dailyReport;
