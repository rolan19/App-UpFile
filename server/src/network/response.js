exports.success = (req, res, message, status) => {
  statusCode = status || 200;
  res.status(statusCode).json({
    err: " ",
    msg: message,
  });
};

exports.error = (req, res, message, status, details) => {
  console.error(`[Error en Endpoint] => ` + details);
  messageStatus = message || "Error en el EndPoint";
  statusCode = status || 500;
  res.status(statusCode).json({
    err: messageStatus,
    msg: " ",
  });
};
