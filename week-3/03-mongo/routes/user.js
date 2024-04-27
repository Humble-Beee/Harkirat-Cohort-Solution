const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username: username,
        password: password
    })
    res.json({
        msg: "User created successfully!"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    try{
        await User.updateOne(
            {
                username: username
            },
            {   
                "$push": { purchasedCourses: courseId }
            }
        )
    }catch(e){
        console.log(e);
    }
    res.json({
        msg: "Purchased complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })
    const purchasedCourses = await Course.find({
        _id: {
            $in: user.purchasedCourses
        }
    })
    console.log(user.purchasedCourses);
    res.json({
        purchasedCourses: purchasedCourses
    })
});

module.exports = router