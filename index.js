const express = require('express');
const Todo = require('./models/todo-model');
const app = express();

app.set('view engine', 'hbs');

// Controllers-------------------
// const Todo = require('./models/todo-model')

// End controllers---------------


app.get('/test', (req, res) => {
    res.send('Hello World')
})

app.get('/testhtml', (req, res) => {
    console.log("you are in the `testhtml` route!");
    res.render('test')
})

app.get('/testvariable', (req, res) => {
    app.render('variable', {saying: "Build complexity very slowwwly"})
})
app.get('/todos', (req, res) => {
    Todo.find({})
    .then(todos => {
        console.log(todos);
        console.log("in the todos route");
        res.render('index', {todos: todos}); 
    })
})
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`app running on ${port}`))