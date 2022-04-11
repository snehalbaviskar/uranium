const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

const mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', route);
mongoose.connect("mongodb+srv://Functionup:IQ1sm0JhoRoUjMS6@cluster0.cbbcd.mongodb.net/snehal-db",{

})

.then( () => console.log("Mongodb is connected"))

.catch(err => console.log(err))



app.listen(process.env.PORT || 4000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});
