const passwordChecker=document.getElementsByClassName('password-conditions');
const password=document.getElementById('password');
const registerBtn=document.getElementById('registerMe');
const confirmPassword=document.getElementById('confirm_password');
let symbol=0;
let number=0;
let capital=0;
let length8=0;
let matchDone=0;
let symbols=/^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*]).{1,}$/;
let capitals=/^(?=.*[A-Z]).{1,}$/;
let numbers=/^(?=.*\d).{1,}$/;
password.addEventListener('keyup',function(event){
    let str=event.target.value;
    if(str.length>=8){
        passwordChecker[0].style.color='rgb(88, 233, 44)';
        length8=1;
    }else{
        passwordChecker[0].style.color= 'rgb(233, 44, 44)';
        length8=0;
    }
    if(str.match(symbols)){
        passwordChecker[1].style.color='rgb(88, 233, 44)';
        symbol=1;
    }else{
        passwordChecker[1].style.color= 'rgb(233, 44, 44)';
        symbol=0;
    }
    if(new RegExp(numbers).test(str)){
        passwordChecker[2].style.color='rgb(88, 233, 44)';
        number=1;
    }else{
        passwordChecker[2].style.color= 'rgb(233, 44, 44)';
        number=0;
    }
    if(new RegExp(capitals).test(str)){
        passwordChecker[3].style.color='rgb(88, 233, 44)';
        capital=1;
    }else{
        passwordChecker[3].style.color= 'rgb(233, 44, 44)';
        capital=0;
    }
    if(password.value==confirmPassword.value&&password.value!=''){
        passwordChecker[4].style.color='rgb(88, 233, 44)';
        matchDone=1;
    }else{
        passwordChecker[4].style.color= 'rgb(233, 44, 44)';
        matchDone=0;
    }
    if(symbol==1&&number==1&&capital==1&&matchDone==1&&length8==1){
        registerBtn.disabled=false;
    }else{
        registerBtn.disabled=true;
    }
})
confirmPassword.addEventListener('keyup',function(event){
    if(password.value==confirmPassword.value&&password.value!=''){
        passwordChecker[4].style.color='rgb(88, 233, 44)';
        matchDone=1;
    }else{
        passwordChecker[4].style.color= 'rgb(233, 44, 44)';
        matchDone=0;
    }
    if(symbol==1&&number==1&&capital==1&&matchDone==1&&length8==1){
        registerBtn.disabled=false;
    }else{
        registerBtn.disabled=true;
    }
})
// regexPattern = /^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])(?=.*[a-zA-Z])(?=.*\d).{8,12}$/;
// Here’s the breakdown of the different parts of the above pattern:

// “^” represents the start of the string or pattern.
// “(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])” matches any string that contains at least one special character, listed inside the square brackets.
// “(?=.*[a-zA-Z])” indicates that the password must contain at least one letter (uppercase or lowercase).
// “(?=.*\d)” denotes that the string/password contains at least one digit.
// “.{8,12}” tells that the password must be 8 to 12 characters in length.
// “$” denotes the end of the pattern string.