const express = require('express');
const newone=require("../logger/logger.js");
const helper = require('../util/helper');
const formatter=require('../validator/formatter');
const lodash = require('lodash');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
    newone.welcome()
});

    router.get('/test-me1',function(req,res){
       helper.date();
       res.send('current date')
});

router.get('/test-me2',function(req,res){
    helper.month();
    res.send('current month')
});

router.get('/test-me3',function(req,res){
    helper.batch();
    res.send('Batch info')
});

router.get('/test-me4',function(req,res){
    
    res.send('trim the string')
    formatter.output();
    formatter.output2();
    formatter.output3();

});



 router.get('/hello',function(req,res){
    const month = [" january","february","march","april","may","june","july","agust","september","october","november","december"]
    res.send('<h3> snehal Baviskar <h3>'+'my fourth APi')
    console.log(lodash.chunk(month,4))

    const odd = [1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(odd))

    const arr1 = [1,2,3,62,6,8];
    const arr2 = [1,2,5,7,62,7];
    const arr3 = [2,4,7,3,8,9];
    const arr4 = [2,61,8,4,10];
    const arr5 = [4,6,3,8,11,10]
    console.log(lodash.union(arr1,arr2,arr3,arr4,arr5))


    const obj =[
     ['horror','The Shining'],
    ['drama','Titanic'],
    ['thriller','Shutter Island'],
    ['fantasy','Pans Labyrinth']
    ]
    
    let a = lodash.fromPairs(obj);
    console.log(a)

});




module.exports = router;
// adding this comment for no reason