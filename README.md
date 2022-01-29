# printful-assignment

## Check it out
[Live demo](https://www.quiz.valdis.me/) is available

## Description
A project made with [Vue.js](https://vuejs.org/) and [Express](https://expressjs.com/)
<br>
Simple quiz webapp that fetches data from either a rest API or a local Express server
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
