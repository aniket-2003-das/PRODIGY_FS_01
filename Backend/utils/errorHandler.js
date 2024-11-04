const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
    })
}

exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "undefined error";
    sendErrorDev(err, res);
};
