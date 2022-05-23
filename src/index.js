const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const multer = require('multer')
const app = express();
app.use(multer().any()) // HERE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://project-3_book_management:ICqOd1Lg5fRtZsMn@cluster0.vkzfn.mongodb.net/group21Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected.."))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});