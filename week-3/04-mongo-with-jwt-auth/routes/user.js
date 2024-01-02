const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Purchase, Course } = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";


async function userExists(username) {
    // should check in the database
    const user = await User.findOne({ username });

    if (user) {
        return true;
    }
    return false;
}

// Admin Routes
app.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        const username = req.body.username;
        const password = req.body.password;

        const userAlreadyExists = await userExists(username);

        if (userAlreadyExists) {
            res.status(400).json({
                msg: "User already exists"
            })
        } else {
            let user = new User({
                username,
                password
            });

            await user.save();
            res.status(201).json({
                msg: "user created successfully"
            });
            return;
        }
    } catch (err) {
        res.sendStatus(500);
        console.log(err);
    }

});

app.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await userExists(username);

        if (user && user.password == password) {
            let token = jwt.sign({ username, password }, jwtPassword);
            return res.status(200).json({
                token
            });
        } else {

            return res.status(400).json({
                msg: "User not exists"
            });

        }
    } catch (err) {
        res.sendStatus(500);
        console.log(err);
    }

});

app.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch {
        res.status(500).json({
            message: 'internal error'
        });
    }
});

app.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        let courseId = req.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user has already purchased the course
        const hasPurchased = await Purchase.findOne({ userId: req.user._id, courseId });

        if (hasPurchased) {
            return res.status(400).json({ error: 'Course already purchased' });
        }

        // Record the purchase
        const purchase = new Purchase({
            userId: req.user._id,
            courseId,
        });

        await purchase.save();

        return res.status(201).json({ message: 'Course purchased successfully' });
    } catch (err) {
        res.status(500).json({
            message: 'internal error'
        });
    }

});

app.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {

        // Fetch the user's purchased courses
        const purchasedCourses = await Purchase.find({ userId: req.user._id });
        return res.status(200).json({ purchasedCourses });

    } catch {
        res.status(500).json({
            message: 'Internal error'
        });
    }
});
