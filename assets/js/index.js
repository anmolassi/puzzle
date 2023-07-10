// function getCookieValue(cookieName) {
//     var name = cookieName + "=";
//     var decodedCookies = decodeURIComponent(document.cookie);
//     var cookieArray = decodedCookies.split(";");
  
//     for (var i = 0; i < cookieArray.length; i++) {
//       var cookie = cookieArray[i].trim();
//       if (cookie.indexOf(name) === 0) {
//         return cookie.substring(name.length, cookie.length);
//       }
//     }
  
//     return "nope";
//   }
// const jwtToken = getCookieValue("jwt");
// if (jwtToken=="nope") {
//     // Redirect to the login page
//     window.location.href = 'https://anmol-assi-puzzle.azurewebsites.net/';
// }