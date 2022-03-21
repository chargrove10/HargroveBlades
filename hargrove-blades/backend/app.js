const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
var router = express.Router();


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

router.get('/customerList', function (req, res) {
    sql.connect(database).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName "+ 
        "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID" +  
        "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID" + 
        "JOIN STATE ON ADDRESS.STATEID=STATE.STATEID");
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.get('/customerList/:customerName/:customerPhone', function (req, res) {

    const name = req.params.customerName
    const phone = req.params.customerPhone

    sql.connect(database).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName "+ 
        "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID" +  
        "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID" + 
        "JOIN STATE ON ADDRESS.STATEID=STATE.STATEID WHERE CUSTOMER.CustomerLastName = ? AND CUSTOMER.CustomerPhone = ?", name, phone);
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});


router.get('/productList', function (req, res) {
    sql.connect(database).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT P.SerialNo, PS.ProductStatusName, style.StyleName, steel.SteelName" + 
        "P.HandleMaterial, P.BladeLength, P.OverallLength, P.Embellishments" +
        "FROM Product P JOIN KnifeStyle style ON P.StyleID = style.StyleId" + 
        "JOIN KnifeSteel steel ON P.SteelID = steel.SteelID" + 
        "JOIN ProductStatus PS ON P.ProductStatusId = PS.ProductStatusID");
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.get('/orderList', function (req, res) {
    sql.connect(database).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT C.CustomerFirstName, C.CustomerLastName, PO.OrderNumber, PO.OrderDate, PO.OrderTotal, PO.Balance"+
        "FROM PRODUCTORDER PO JOIN CUSTOMER C ON C.CustomerID = PO.CustomerID");
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});