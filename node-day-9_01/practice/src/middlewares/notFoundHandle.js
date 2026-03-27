const constants = require("@/config/constants");
const { httpCodes } = constants;

const notFound = (req, res) => {
  res.error(`Can not ${req.method} ${req.url}`, httpCodes.notFound);
};

module.exports = notFound;
