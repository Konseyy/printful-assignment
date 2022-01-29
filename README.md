# printful-assignment

## Check it out
[Live demo](https://www.quiz.valdis.me/) is available

## Description
A project made with a [Vue.js](https://vuejs.org/) frontend and optional [Express](https://expressjs.com/) backend
<br>
This webapp fetches data about quizes, questions and checks answers using either a public REST API or calls to a locally running Express.js server
<br>
## Data flow breakdown
The Homepage fetches all available quizes on load
<br>
The individual question page fetches the first question's info on load, and every subsequent question data when prompted by the user pressing the "Next" button
<br>
After the user presses the "Next" button on the last question the answers are submitted to be checked and upon receiving the results the user is redirected to the results page where he can view the amount of questions he got correct
<br>
## Validation
There is frontend validation that requires the user to select a name before beginning a quiz and to select an answer before hitting the "Next" button on a question
## Project setup
### Install dependencies
```
npm install
```
### Run local Vue.js server that compiles and hot-reloads for development
```
npm run serve
```

## Working with express
### Change .env to use local server
```
VUE_APP_SERVER_PORT= {...}
VUE_APP_USE_LOCAL_SERVER=true
```
If you were already running `npm run serve` you might have to rerun the command for the environment variable changes to take effect
### Start server
```
npm run server
```
### Changing server funcionality
To change server funcionality change the `server.js` file located the root of the project
### Changing local data
Local data is not stored in a database, but rather in `/lib/data.js`
