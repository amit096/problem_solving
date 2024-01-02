const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";


async function userExists(username) {
    // should check in the database
    const user = await Admin.findOne({ username });

    if (user) {
        return true;
    }
    return false;
}


async function courseExists(title) {
    // should check in the database
    const course = await Course.findOne({ title });

    if (course) {
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
            let admin = new Admin({
                username,
                password
            });

            await admin.save();
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

app.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        let exists = await courseExists(req.body.title);
        if (exists) {
            return res.status(400).send("course already exists");
        } else {
            const course = new Course({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            });
            await course.save();
            return res.status(201).send('course added succesfully');
        }
    } catch {
        res.status(500).json({
            message: 'internal error'
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch {
        res.status(500).json({
            message: 'internal error'
        });
    }
});

module.exports = router;