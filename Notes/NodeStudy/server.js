var num = 123
var temp = 123
var rem = 0
var rev = 0

while(num>0){
    rem = num%10
    rev =((rev*10)+rem)
    num = parseInt(num/10)
    console.log(`${rem} ${rev} ${num}`)
}

if (temp == rev){
    console.log("palindrum")
    
}
else{
    console.log("not palindrum")
}

