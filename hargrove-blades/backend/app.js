const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Connection achieved on : ", PORT)
})

const database = {
    username: 'NAME',
    password: 'PASS',
    server: 'server',
    database: 'databse'
}

sql.connect(database, err => {


    if (err) {
        console.log(err)
    } else {
        console.log('Connected')
    }
})