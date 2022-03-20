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
    username: '',
    password: '',
    server: 'server',
    database: 'databse',
    options: {
        instancename: 'SQLEXPRESS' //This tells its a SQL Server instance
    },
    port: 1433
}

sql.connect(database, err => {


    if (err) {
        console.log('Not Connected')
    } else {
        console.log('Connected')
    }
})

app.get('/', (req,res) => {
    console.log(res)
    return sql.Request().query('SELECT * FROM CUSTOMERS')

})

app.findOne()