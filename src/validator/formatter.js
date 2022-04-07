let text = "   FUNCTionup";
let output = function trim() {

    let a= text.trim()
    console.log(a);

}

let output2 = function lowercase(){

    let b= text.toLocaleLowerCase()
    console.log(b);
}

let output3 = function uppercase(){
    let c= text.toLocaleUpperCase()
    console.log(c);
}


module.exports.output = output;
module.exports.output2 = output2;
module.exports.output3 = output3;