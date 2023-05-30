# puzzle
## https://puzzle-onxq.onrender.com 
*please wait when opening website as it is deployed on free plan so it may take time to load.*
### Puzzles
The puzzles on this website challenges user's capability to relate the things being spoken or shown in the clues with the question to reach the correct answer.
### How to step up project?
The following steps are to run project on localhost.
<br>
**Step1:** Clone the repository in your editor
<br>
**Step2:** Run *npm install*, if any library doesn't gets installed, then do it manually.
<br>
**Step3:** Create *.env* in root directory
<br>
**Step4:** Initialize MONGODB_URL, EMAIL, PASS, SECRET_KEY in .env with mongodb connection url, email for nodemailer to send mails, third-party access of email password, encryption key for bcrypt respectively.
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
### How to access admin?
<br>
Access Admin login at url: https://puzzle-onxq.onrender.com/admin
<br>
<br>

### Implemented Features
* Registration Page for new users
* Login Page for old users
* Email verification after registration
* No login of unverified users
* Reset Password for old users
* Auto Login for users if user is refreshing website repeatedly on same browser or reopening after restarting browser
* Progress save of user and easy retrieval on reopening of website
* Secure Password: Password must be of length atleast 8, contains capital letters, symbols and numbers
* Timer on each level to track time spent on particular puzzle
* Leaderboard button on each puzzle to track yourself on leaderboard
* Clue button on each puzzle
* Successful submission shows user's accuracy and time spent
* Encryption for storing passwords in database
* Admin page to access the progress of users

### Goal and Deadends
<img src="https://user-images.githubusercontent.com/79657095/235725331-8b1f9dfa-0066-41d8-9c1a-c724d1a6d676.png" width="600" height="300">


**level 3 in green color represents the goal.**
<br>
**level 3 in red color represents the deadends.**

### How to reach the goal?
**Step1:** Solve the puzzle of level 1
<br>
**Step2:** Solve level-2 question on left side. *(In url it is level 2)*
<br>
**Step3:** Solve level-3 second question from left side. *(In url it is level 5)*
<br>
### Answers
|   URL level   |    Answers    |
| ------------- | ------------- |
|       1       |     fence     |
|       2       |     breath    |
|       3       |      fire     |
|       4       |     silence   |
|       5       |     future    |
|       6       |      flag     |
|       7       |   footprints  |
