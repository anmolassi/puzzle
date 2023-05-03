var goBtn = document.getElementById("login");
var timeBanner = document.getElementById("timeSpent");
var startTime ;
console.log(startTime)

let successBanner = document.getElementById("success");
successBanner.style.display = "none";
// startTime= new Date(parseInt(startTime,10));
async function timeDifference(date1, date2) {
    // console.log(date1)

    // console.log(date2);
  var difference = date1.getTime() - date2.getTime();

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);
  var timedetails = {
    days: daysDifference,
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference,
  };
  return timedetails;
}
const intervalId = setInterval(async function () {
  startTime = new Date(startTime);
  var cur = new Date();
  console.log(startTime);
  var time = await timeDifference(cur, startTime);
  timeBanner.innerHTML = `Time Spent: ${time.days}:${time.hours}:${time.minutes}:${time.seconds}`;
}, 1000);

function timerAndSuccess(){
    let userId = document.getElementById("user_id").value;
    let answerSubmitted = document.getElementById("answer").value;
    let level = document.getElementById("level").value;
    $.ajax({
      url: `https://puzzle-onxq.onrender.com/level${level}/`,
      type: "post",
      data: {
        id: userId,
        answer: answerSubmitted,
        level: level,
      },
      beforeSend: function () {
        successBanner.style.display = "none";
      },
      success: async function (data) {
        console.log(data);
        if (data.message == "success") {
          successBanner.style.display = "flex";
          var accuracy = document.getElementById("accuracy");
          setTimeout(async function(){
            accuracy.innerHTML = `Accuracy: ${data.accuracy}%`;
          },200)
          console.log(data.time);
          timeBanner.innerHTML = `Time Spent: ${data.time.days}:${data.time.hours}:${data.time.minutes}:${data.time.seconds}`;
          clearInterval(intervalId);
        }else if(data.message=="wrong"){
            alert("WRONG ANSWER!!!");
        }else{
            console.log(data.startTime)
            setTimeout(async function(){
              timeBanner.setAttribute('startTime',data.startTime);
            },200)
            
            startTime=data.startTime;
        }
      },
    });
}
goBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  timerAndSuccess();
});
window.addEventListener("load",async function(){
    timerAndSuccess();

})
