# puzzle
### How to step up project?
**Step1:** Clone the repository in your editor
<br>
**Step2:** Run *npm install*, if any library doesn't gets installed, then do it manually.
<br>
**Step3:** Create *.env* in root directory
<br>
**Step4:** Initialize MONGODB_URL, EMAIL, PASS in .env with mongodb connection url, email for nodemailer to send mails, third-party access of email password respectively.
<br>
**Step5:** Open assets->js->answerCheck.js and in line 46 replace *https://puzzle-onxq.onrender.com* with *http://localhost:5000*
<br>
**Step6:** Repeat above step for config->Nodemailer.js for line 29 and 55.
<br>
**Step7:** Run *npm start*
<br>
**Step8:** Open *localhost:5000* on browser
<br>
<br>
### Implemented Features
* Registration Page for new users
* Login Page for old users
* Email verification after registration
* No login of unverified users
* Reset Password for old users
* Auto Login for users if user is opening website repeatedly on same browser
* Progress save of user and easy retrieval on reopening of website
* Secure Password: Password must be of length atleast 8, contains capital letters, symbols and numbers
* Timer on each level to track time spent on particular puzzle
* Timer starts when you first time open the puzzle
* Timer stops when successful submission is made
* Leaderboard button on each puzzle to track yourself on leaderboard
* Clue button on each puzzle
* Successful submission shows user's accuracy and time spent
