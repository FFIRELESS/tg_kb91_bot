export const errorHandler = (err, req, res, next) => {
    console.log();
    console.log("SERVER ERROR");
    console.log(err.message);
    console.log();
    res.status(500).send("Something went wrong");
    next();
};

export default errorHandler;