require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoute = require('./route/contactRoute');
const path = require('path');

const app =express();


app.use(express.json());

app.use(cors());


const port =process.env.PORT || 5000;

app.use('/',contactRoute)




// static assets
// if process.env.NODE_ENV=== 'production' it means if our site is deployng then do some stuffs

if(process.env.NODE_ENV=== 'production'){
    // create folder
    // express.static delivers static files(html, css) when we want to use build.we want to serve this files in the build folder folder
    app.use(express.static('client/build'));
    // if client makes request,we want to send index.html first which is all the react app
    app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}


app.listen(port, console.log(`server listening on port: ${port}`))




// -----------------important----------------------------------

// in order to send locally from your computer an email succesfully, you have to let nodemailer have access to gmail:
// https://myaccount.google.com/lesssecureapps


// in order to allow herokus machine to have access on gmail:
// https://accounts.google.com/b/0/DisplayUnlockCaptcha



