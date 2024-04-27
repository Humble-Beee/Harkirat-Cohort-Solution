// Middleware for handling auth
const { Admin } = require("../db");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the
    const usename = req.headers.usename;
    const password = req.headers.password;
    Admin.findOne({
        usename: usename,
        password: password
    }).then(function(value){
        if(value){
            next();
        }else{
            res.status(404).json({
                msg: "Admin doesn't exist"
            })
        }
    })
}

module.exports = adminMiddleware;