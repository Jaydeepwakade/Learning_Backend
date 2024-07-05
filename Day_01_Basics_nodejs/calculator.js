const crypto = require("crypto")

const args = process.argv.slice(2)
console.log(args)


if (args.length === 0) {
    console.log("no argumentys provided please provide the arguments to do the operations")
    process.exit(1)
}
const operation = args[0]
const Numbers = args.slice(1).map(Number)

console.log(Numbers)


const add = (num)=>{
    return num.reduce((acc,nums)=>acc+nums,0)
}

const sub = (num)=>{
   return num.reduce((acc,nums)=>acc-nums)
}
const multiple = (num)=>{
    return num.reduce((acc,nums)=>acc*nums,1)
}
const division =(num)=>{
 return num.reduce((acc,nums)=>acc/nums)
}
const sine = (num)=>{
    return Math.sin(num)
}
const cosine =(num)=>{
    return Math.cos(num)
}
const tangent =(num)=>{
   return Math.tan(num)
}
const  randomnumber =(length)=>{
    if(!length || isNaN(length)){
console.log("provide length for random number generation")
    process.exit(1)
    }
    let randombytes = crypto.randomBytes(Number(length))
    return randombytes.toString("hex")
}

let result;
 switch (operation) {
    case "add":  result =add(Numbers)
    break;
    case "sub": result = sub(Numbers)
    break;
    case "mult": result = multiple(Numbers)
    break;
    case "divide" : result = division(Numbers)
    break;
    case "sin" : if(Numbers.length !==1){
        console.log("please provide a single number")
        process.exit(1)
    }
    result =sine(Numbers[0])
    break;
    case "cos":if(Numbers.length !==1){
        console.log("please provide a single number")
        process.exit(1)
    }
    result= cosine(Numbers[0])
    break
     case "tan" : if(Numbers.length !==1){
        console.log("please provide a single number")
        process.exit(1)
    }
    result =tangent(Numbers[0])
    break;

    case "random" : if(Numbers.length >1){
        console.log("Please provide the only one number for the length of the random number")
        process.exit(1)
    }
    const length = Numbers.length ===1? Numbers[0]:null
    if(!length){
        console.log("please provide the length for the random number genration")
        process.exit(1)
    }
    result =  randomnumber(length)
    break
    default:
        console.log("Invalid operation. Supported operations: add, sub, mult, divide, sin, cos, tan, random.");
        process.exit(1);
    
 }

 console.log(`Result : ${result}`)