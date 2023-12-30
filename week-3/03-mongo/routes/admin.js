const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require('../db/index');


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
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        let username = req.body.username;
        let password = req.body.password;

        let exists = await userExists(username);

        if (exists) {
            return res.status(400).send("Admin already exists");
        } else {
            const admin = new Admin({
                username,
                password,
            });
            await admin.save();
            return res.status(201).send('Admin added succesfully');
        }
    } catch {
        res.status(500).json({
            message: 'internal error'
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
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
        Course
            .find()
            .then(courses => {
                res.status(200).json(courses);
            });
    } catch {
        res.status(500).json({
            message: 'internal error'
        })
    }
});

module.exports = router;