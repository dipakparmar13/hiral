const responseHnadler = ({ res, status, message, otpIsMatched }) => {
  return res.status(status).json({
    message: message,
    otpIsMatched: otpIsMatched,
  });
};

module.exports = {
  responseHnadler,
};
