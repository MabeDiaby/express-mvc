const express = require('express');
const Todo = require('./models/todo-model');
const app = express();

app.set('view engine', 'hbs');

// Controllers-------------------
// const Todo = require('./models/todo-model')

// End controllers---------------

// text routes---------------
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

// app.put('/todos', (req, res) => {
//     console.log("object");
// })
// end text routes---------------

// index routes
app.get('/todos', (req, res) => {
    Todo.find({})
    .then(todos => {
        console.log(todos);
        console.log("in the todos route");
        res.render('index', {todos: todos}); 
    })
})

// show routes---------------
app.get('/todos/:id', (req, res) => {
    // console.log(req.params.id);
    // 61b264db31a4415702069f98

    // Three things can happen based on the validity-ishness of the ID param:
        // if it's valid (correct length) and in the DB, return the matching document
        // if it's valid (correct length) and not in DB, return null
        // if it's invalid (incorrect length) (obvi not in DM), error! (as of right now)
    Todo.findById(req.params.id)
    .then(todo => {
        console.log(todo);
        res.render('show', todo)
    })
    
    // res.send("show route is working")
    // res.render('show', {title: "Test Title #1", complete: false})
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`app running on ${port}`))