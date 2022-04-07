let date = function printDate(){
    console.log(new Date());
}
let month=function printMonth(){
    console.log(new Date().getMonth() +1)
}
let batch=function getBatchInfo(){
    console.log('uranium, w3dD1, topic for today is nodejs')
}



module.exports.date=date;
module.exports.month=month;
module.exports.batch=batch;

