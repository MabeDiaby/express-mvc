const express = require('express');
const { render } = require('express/lib/response');
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

// new route
router.get('/new', (req, res) => {
    // res.send("new route is returing!")
    res.render('new')
})

// create route
router.post('/', (req, res) => {
    // todo - how do i get the info from the form?
    // const reqBody = req.body
    // console.log(reqBody);
    // todo - communicate with DB
    Todo.create(req.body)
        .then(todo => {
            // console.log(todo);
            res.redirect('/todos')
        })

})

// edit route
router.get('/:id/edit', (req, res) => {
    // res.send("EDIT route is ok")
    Todo.findById(req.params.id)
        .then(todo => {
            res.render('edit', todo)
        })
})

// update route
router.put('/:id', (req, res) => {
    // res.send("UPDATE route was reached!")
    const id = req.params.id
    Todo.findOneAndUpdate(
        {_id:id},
        {
            title: req.body.title,
            complete: req.body.complete === 'on'
        },
        {new: true},
    )
        .then(todo => {
            res.render('show', todo)
        })
})

// delete route

// Delete: DELETE the todo with a given id from the database
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Todo.findOneAndRemove({ _id: id })
      .then(() => {
        res.redirect('/todos');
      })
      .catch(console.error);
  });

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