const express = require('express');
const app = express();
const PORT = 3000;
const { ceateTodo, updateTodo } = require('./type');
const { todo } = require('./db');
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:5173', // or an array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


app.use(express.json());


app.post('/todo', async (req, res) => {
    try {
        const createPayload = req.body;
        const parsePayload = ceateTodo.safeParse(createPayload);
        if (!parsePayload.success) {
            res.status(411).json({ // 411: client side error ; The server refuses to accept the request without a defined Content-Length
                msg: "you sent a wrong input"
            });
            return;
        }
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.status(201).json({
            "msg": " todo created "
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find({}) || [];
        res.status(200).json({
            "todo": todos
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


app.put('/completed', async (req, res) => {
    try {
        const updatePayload = req.body;
        const parsePayload = updateTodo.safeParse(updatePayload);
        if (!parsePayload.success) {
            res.status(411).json({
                msg: "you sent a wrong input"
            });
            return;
        }
        await todo.updateOne({ _id: req.body.id }, { completed: true });
        res.status(200).json({
            "msg": "Todo is updated"
        });
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

});

app.listen(PORT, () => {
    console.log(`port running at ${PORT}`)
});

