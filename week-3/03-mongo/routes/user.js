const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course,Purchase } = require('../db/index');


async function userExists(username, password) {
    // should check in the database
    const user = await User.findOne({ username });

    if (user && user.password === password) {
        return true;
    }
    return false;
}

// User Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        let username = req.body.username;
        let password = req.body.password;

        let exists = await userExists(username, password);

        if (exists) {
            return res.status(400).send("User already exists");
        } else {
            const user = new User({
                username,
                password
            });
            await user.save();
            return res.status(201).send('User added succesfully');
        }
    } catch (error){
        console.error('Error in user signup:', error);

        res.status(500).json({
            message: 'internal error'
        })
    }
});

router.get('/courses', (req, res) => {
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

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId;

        // Check if the course exists
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
    } catch {
        res.status(500).json({
            message: 'Internal error'
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
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

module.exports=router;