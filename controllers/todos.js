const express = require('express');
const router = express.Router();

const Todo = require('../models/todo-model')

// index routes
router.get('/', (req, res) => {
    Todo.find({})
    .then(todos => {
        console.log(todos);
        console.log("in the todos route");
        res.render('index', {todos: todos}); 
    })
})

// show routes---------------
router.get('/:id', (req, res) => {
// Three things can happen based on the validity-ishness of the ID param:
        // if it's valid (correct length) and in the DB, return the matching document
        // if it's valid (correct length) and not in DB, return null
        // if it's invalid (incorrect length) (obvi not in DM), error! (as of right now)
    Todo.findById(req.params.id)
    .then(todo => {
        console.log(todo);
        res.render('show', todo)
    })
})

module.exports = router