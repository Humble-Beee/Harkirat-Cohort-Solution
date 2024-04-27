const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const usename = req.headers.usename;
    const password = req.headers.password;
    User.findOne({
        usename: usename,
        password: password
    }).then(function(value){
        if(value){
            next();
        }else{
            res.status(404).json({
                msg: "User doesn't exist"
            })
        }
    })
}

module.exports = userMiddleware;