// adding this comment for no reason
const express = require('express');
const res = require('express/lib/response');
const logger = require('./logger')

const router = express.Router();

//problem1
router.get('/movies', function (req, res) {

    let array = ['rang de basanti', 'the shining', 'lord of the rings', 'bartman begins']
    let count = req.query.count

    res.send(array)
})



//problem2&3
router.get('/movies/:indexNumber', function (req, res) {
    const arr = ["rang de basanti", "the shining", "lord of the rings", "bartman begins"]
    // console.log(req)
    const id = req.params.indexNumber
    if (id < arr.length) {
        res.send(arr[id])
    } else {
        res.send('enter valid id')
    }


});

//problem4

router.get('/films', function (req, res) {
    const arr4 = [
        {
            id: 1,
            name: "the shining"
        },

        {
            id: 2,
            name: "Incendies"
        },

        {
            id: 3,
            name: "Rang de Basanti"
        },

        {
            id: 4,
            name: "Finding Nemo"
        },
    ]
    res.send(arr4)

});

// PROBLEM 5


router.get('/films/:filmId', function (req, res) {
    const fNames = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Nemo'
    }]

    let a;
    let n = req.params.filmId
    for (let i = 0; i < fNames.length; i++) {
        if (n > fNames[i].id) {
            a = (" no movie exist it his id set different id")
        }

        if (n == fNames[i].id) {
            a = fNames[i]
        }
    }
    res.send(a)

});


let obj =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "Ashish",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ]
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ]
       },

    ]
router.post('/test-post1', function (req, res) {
    let data = req.body
    console.log(data)
    obj.map((x)=>{
        if (x.name==data.name){
            return res.send("player already exist")
        
    }})
    obj.push(data)

    res.send({  newplayer:obj })
});


module.exports = router;
// adding this comment for no reason