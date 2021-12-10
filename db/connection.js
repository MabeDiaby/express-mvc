const mongoose = require('mongoose')

const mongoURI = process.env.NODE_ENV === 'production' //on heroku this will be true on your cumputer this will be false
? process.env.DB_URL : `mongodb://localhost/express-mvc`
// ? process.env.DB_URL : `mongodb://127.0.0.1:27017/express-mvc`

// const mongoUrl =  `monogodb://localhost/express-mvc`

mongoose.connect(mongoURI)
    .then(instance => {
        console.log(`Connected to db: ${instance.connection[0].name}`);
    })
    .catch(error => console.log(`Connection failed`, error))

    module.exports = mongoose