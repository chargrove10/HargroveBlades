const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser)

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

app.get("/", (req,res) => {
    res.send("Sample get request")
})