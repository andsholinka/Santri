const express = require('express');
// const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
// dotenv.config()
require('dotenv/config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// import routes
const santriRouter = require('./routes/santri')

// routes example
app.use('/santri', santriRouter);

// Connect to DB
var uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to failed ' + err)
})

app.listen(process.env.PORT, () => {
    console.log(`App listens to port ${process.env.PORT}`);
});