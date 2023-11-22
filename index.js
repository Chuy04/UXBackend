const express = require('express');
const mysql = require('mysql2');
const mycoon = require('express-myconnection');
const cors= require('cors')
const path=require('path')
const bodyParser = require('body-parser');
const app = express()

import { PORT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config.js'

const dbOptions = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
};

require('dotenv').config();

app.use(cors())
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.json());
app.use(mycoon(mysql, dbOptions, 'single'));
// app.use(express.static(p1ath.join(__dirname,'dbimages')))

const connection = mysql.createConnection(dbOptions);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err.stack);
        return;
    }
    console.log('Connected to database with ID: ', connection.threadId);
});

app.use(require('./routes/routes'))
app.use(require('./routes/routes2'))
app.use(require('./routes/routes3'))

app.listen(PORT,()=>{
    console.log("Server on port", PORT)
})