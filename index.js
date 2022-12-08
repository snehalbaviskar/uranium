const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


const route = require('./route.js');

const app = express();

app.use(bodyParser.json());

app.use('/', route);

mongoose.connect("mongodb+srv://Sagar-functionup:radhaswami123@cluster0.7xlsi.mongodb.net/groupXDatabase?retryWrites=true&w=majority",
{
    useNewUrlParser : true 
})

.then(  () => console.log("MongoDB is Connected"))
.catch(err => console.log(err))


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});