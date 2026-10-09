const reqLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

module.exports = reqLogger;