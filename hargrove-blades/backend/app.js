const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
var router = express.Router();
const cors = require('cors')


const app = express();
const PORT = 3000;

app.use(bodyParser)
app.use(cors())

app.listen(PORT, () => {
    console.log("Connection achieved on : ", PORT)
})

var config = {
    server: 'COT-CIS4375-01',
    database: 'HargroveBlades',
    user: 'ISSD',
    password: 'HargroveBlades@!',
    port: 1433,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
};

function listProducts() {
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        request.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone " +
        "FROM CUSTOMER "+ 
        "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID").then(function (recordSet) {
            console.log(recordSet);
            conn.close();
        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}

listProducts();

app.get('/', (req,res) => {
    console.log(res)
    return sql.Request().query('SELECT * FROM CUSTOMERS')

})

router.get('/customerList', function (req, res) {
    sql.connect(config).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName "+ 
        "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID " +  
        "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID " + 
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

    sql.connect(config).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName "+ 
        "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID " +  
        "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID " + 
        "JOIN STATE ON ADDRESS.STATEID=STATE.STATEID WHERE CUSTOMER.CustomerLastName = ? AND CUSTOMER.CustomerPhone = ?", name, phone);
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});


router.get('/productList', function (req, res) {
    sql.connect(config).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT P.SerialNo, PS.ProductStatusName, style.StyleName, steel.SteelName " + 
        "P.HandleMaterial, P.BladeLength, P.OverallLength, P.Embellishments " +
        "FROM Product P JOIN KnifeStyle style ON P.StyleID = style.StyleId " + 
        "JOIN KnifeSteel steel ON P.SteelID = steel.SteelID " + 
        "JOIN ProductStatus PS ON P.ProductStatusId = PS.ProductStatusID");
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.get('/orderList', function (req, res) {
    sql.connect(config).then(() => {
        //Query selects everything but we selecting specifics for tables
        return sql.query("SELECT C.CustomerFirstName, C.CustomerLastName, PO.OrderNumber, PO.OrderDate, PO.OrderTotal, PO.Balance "+
        "FROM PRODUCTORDER PO JOIN CUSTOMER C ON C.CustomerID = PO.CustomerID");
    }).then (data => {
        res.send(data.recordset);
    }).catch(err => {
        res.status(500).send(err);
    })
});