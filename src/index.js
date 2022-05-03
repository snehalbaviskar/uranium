const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route")
const mongoose = require("mongoose");
const { Router } = require("express");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Rubi_db:T2P9R5d5lWl7SRAF@cluster0.tvyoi.mongodb.net/Project-1',
{
useNewurlParser: true,
useUnifiedTopology: true,
})

.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

