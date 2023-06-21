var firstName = document.getElementById("first_name");
var lastName = document.getElementById("last_name");
var validRegexName = /^[a-zA-Z]+$/;
firstName.addEventListener("keyup", function () {
  if (firstName.value.match(validRegexName)) {
    firstName.style.border = "var(--clr-neon-gr) 0.125em solid";
    firstName.style.color = "var(--clr-neon-gr)";
    firstName.style.boxShadow =
      "inset 0 0 0.5em 0 var(--clr-neon-gr), 0 0 0.5em 0 var(--clr-neon-gr)";
    //Seems good
  } else {
    firstName.style.border = "var(--clr-neon-rd) 0.125em solid";
    firstName.style.color = "var(--clr-neon-rd)";
    firstName.style.boxShadow =
      "inset 0 0 0.5em 0 var(--clr-neon-rd), 0 0 0.5em 0 var(--clr-neon-rd)";
  }
});
lastName.addEventListener("keyup", function () {
  if (lastName.value.match(validRegexName)) {
    lastName.style.border = "var(--clr-neon-gr) 0.125em solid";
    lastName.style.color = "var(--clr-neon-gr)";
    lastName.style.boxShadow =
      "inset 0 0 0.5em 0 var(--clr-neon-gr), 0 0 0.5em 0 var(--clr-neon-gr)";
    //Seems good
  } else {
    lastName.style.border = "var(--clr-neon-rd) 0.125em solid";
    lastName.style.color = "var(--clr-neon-rd)";
    lastName.style.boxShadow =
      "inset 0 0 0.5em 0 var(--clr-neon-rd), 0 0 0.5em 0 var(--clr-neon-rd)";
  }
});
