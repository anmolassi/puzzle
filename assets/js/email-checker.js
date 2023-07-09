// var email = document.getElementById("email");
// var invalidEmail = document.getElementById("invalid_email");
// var validEmail = document.getElementById("valid_email");
// var validEmailExists = document.getElementById("valid_email_exists");
// var validRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// email.addEventListener("keyup", function () {
//   if (email.value.match(validRegex)) {
//     $.ajax({
//         url: `https://anmol-assi-puzzle.azurewebsites.net/emailCheck/${email.value}`,
//         // url: `http://localhost:5000/emailCheck/${email.value}`,
//         type: "get",
//         beforeSend: function () {
          
//         },
//         success: async function (data) {
//             if(data.email==1){
//                 invalidEmail.style.display="none";
//                 validEmailExists.style.display="none";
//                 validEmail.style.display="block";
//                 email.style.border="var(--clr-neon-gr) 0.125em solid";
//                 email.style.color="var(--clr-neon-gr)";
//                 email.style.boxShadow="inset 0 0 0.5em 0 var(--clr-neon-gr), 0 0 0.5em 0 var(--clr-neon-gr)";
//                 //Seems good
//             }else{
//                 invalidEmail.style.display="none";
//                 validEmail.style.display="none";
//                 validEmailExists.style.display="block";
//                 email.style.border="var(--clr-neon-rd) 0.125em solid";
//                 email.style.color="var(--clr-neon-rd)";
//                 email.style.boxShadow="inset 0 0 0.5em 0 var(--clr-neon-rd), 0 0 0.5em 0 var(--clr-neon-rd)";
//                 //email exsists
//             }
//         },
//       });
//   } else {
//     validEmailExists.style.display="none";
//     validEmail.style.display="none";
//     invalidEmail.style.display="block";
//     email.style.border="var(--clr-neon-rd) 0.125em solid";
//     email.style.color="var(--clr-neon-rd)";
//     email.style.boxShadow="inset 0 0 0.5em 0 var(--clr-neon-rd), 0 0 0.5em 0 var(--clr-neon-rd)";
//   }
// });