const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";
const dbName = "normal_db";
mongoose.connect(
    `mongodb+srv://{usename}:{password}@cluster0.qef9hks.mongodb.net/${dbName}`,
);

const User = mongoose.model("User", {
    name: String,
    username: String,
    password: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
    // should check in the database
    const user = await User.findOne({ username });

    if (user && user.password === password) {
        return true;
    }
    return false;
}

app.post("/addUser", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    let exists = await userExists(username, password);
    if (exists) {
        return res.status(400).send("User already exists");
    } else {
        const user = new User({
            username,
            name,
            password,
        })
        await user.save();
        return res.status(201).send('User added succesfully');
    }
});

app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    let exists = await userExists(username, password);
    if (!exists) {
        return res.status(403).send("User doesnt exist in our in memory db");
    }
    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", async function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return a list of users other than this username from the database
        const allUsers = await User.find();

        const users = allUsers.filter((user) => {
            if (user.username !== username) return user;
        })

        return res.status(200).json({
            users
        });

    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000, () => {
    console.log('port start at 3000');
});