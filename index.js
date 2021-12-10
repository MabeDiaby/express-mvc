const express = require('express');
const methodOverride = require('method-override');
const app = express();
app.set('view engine', 'hbs');

// magic lines for configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Controllers-------------------
// const Todo = require('./models/todo-model')

const todoController = require('./controllers/todos')

app.use('/todos' , todoController)


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

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`app running on ${port}`))