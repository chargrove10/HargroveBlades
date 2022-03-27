const express = require('express');
const sql = require('mssql');
//const bodyParser = require('body-parser');
//var router = express.Router();
const cors = require('cors')

const app = express();
const PORT = 3000;

//app.use(bodyParser)
app.use(cors())
app.use(express.json())

//router.use(cors())
//router.use(bodyParser)

app.listen(PORT, () => {
    console.log("Connection achieved on : ", PORT)
})

// var config1 = {
//     server: 'COT-CIS4375-01',
//     database: 'HargroveBlades',
//     user: 'ISSD',
//     password: 'HargroveBlades@!',
//     port: 1433,
//     options: {
//         trustServerCertificate: true // change to true for local dev / self-signed certs
//       }
// };

var config = {
    user: 'CZ',
    password: 'CZ1',
    server: 'DESKTOP-O78Q1FG',
    database: 'HargroveBlades',
    port: 1433,
    options: {
        trustServerCertificate: true
    }
}

//customer List Page

//populates drop down list
app.get('/customer', async (req,res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT StateID, StateInitials FROM STATE");
        
        const state = result.recordset

        res.send(state)
        
    } catch (err){
        res.send(err)
    }
})

app.post('/customer', async (req,res) => {

         try {
             //making 'pool' awaiting the connection
             let pool = await sql.connect(config)
             //making result awaiting the request to the connection
             let result = await pool.request()
                
                 //gather inputs
                 .input('CustomerFirstName_p', req.body.CustomerFirstName)
                 .input('CustomerLastName_p', req.body.CustomerLastName)
                 .input('CustomerPhone_p',  req.body.CustomerPhone)
                 .input('CustomerEmail_p',  req.body.CustomerEmail)
                 .input('CustomerNote_p',  req.body.CustomerNote)
                 .input('AddressLine1_p',  req.body.AddressLine1)
                 .input('AddressLine2_p',  req.body.AddressLine2)
                 .input('DefaultAddress_p',  req.body.DefaultAddress)
                 .input('City_p',  req.body.City)
                 //need to pass over StateID from the dropdown
                 .input('StateID_p',  req.body.StateID)
                 .input('ZipCode_p',  req.body.ZipCode)
                 .input('Country_p',  req.body.Country)
                
                 //executes the stored procedure "GetCustomers"
                 .execute("dbo.CreateNewCustomer");
             const customers = result.recordset;

             res.send(customers)
             console.log(customers)
         } catch (err){
             res.send(err)
             console.log(err)
         }
    
})

//this should run a stored procedure using async functions
app.get('/customerList', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT CUSTOMER.CustomerID, CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName, ADDRESS.DefaultAddress "+ 
            "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID " +  
            "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID " + 
            "JOIN STATE ON ADDRESS.STATEID=STATE.STATEID WHERE ADDRESS.DefaultAddress = 'true'");
        const customers = result.recordset;

        res.send(customers)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/customerList/:name&:phone', async (req, res) => {

    let name = req.params.name;
    let phone = req.params.phone;

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT CUSTOMER.CustomerID, CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName, ADDRESS.DefaultAddress "+ 
            "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID " +
            "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID " + 
            "JOIN STATE ON ADDRESS.STATEID=STATE.STATEID WHERE CUSTOMER.CustomerLastName = "+name+" OR CUSTOMER.CustomerPhone = "+phone);
        const customers = result.recordset;

        res.send(customers)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/editCustomer/:id&:flag', async (req, res) => {

    let id = req.params.id
    let flag = req.params.flag

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT TOP 1 CUSTOMER.CustomerID, CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, CUSTOMER.CustomerEmail," + 
            " ADDRESS.AddressID, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.DefaultAddress, ADDRESS.City, STATE.StateInitials, ADDRESS.StateID, ADDRESS.ZipCode," +
            " ADDRESS.Country FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID = ADDRESS.CUSTOMERID" + 
            " JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID" + 
            " JOIN STATE ON ADDRESS.STATEID = STATE.STATEID WHERE CUSTOMER.CUSTOMERID = " + id + "AND ADDRESS.DefaultAddress = " + flag);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/editCustomer/', async (req, res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            //gather inputs
            .input('CustomerFirstName_p', req.body.CustomerFirstName)
            .input('CustomerLastName_p', req.body.CustomerLastName)
            .input('CustomerPhone_p',  req.body.CustomerPhone)
            .input('CustomerEmail_p',  req.body.CustomerEmail)
            .input('CustomerNote_p',  req.body.CustomerNote)
            .input('AddressLine1_p',  req.body.AddressLine1)
            .input('AddressLine2_p',  req.body.AddressLine2)
            .input('DefaultAddress_p',  req.body.DefaultAddress)
            .input('City_p',  req.body.City)
            //need to pass over StateID from the dropdown
            .input('StateID_p',   req.body.StateID)
            .input('ZipCode_p',  req.body.ZipCode)
            .input('Country_p',  req.body.Country)
            .input('AddressID_p', req.body.AddressID)
            .input('CustomerID_p', req.body.CustomerID)
           
            //executes the stored procedure "GetCustomers"
            .execute("dbo.UpdateCustomer");
        const customers = result.recordset;

        res.send(customers)
        console.log(customers)
    } catch (err){
        res.send(err)
        console.log(err)
    }
});

// app.get('/editCustomer/:id&:flag', function (req, res) {
//     let id = req.params.id
//     let flag = req.params.flag

//     sql.connect(config).then(() => {
//         return sql.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, CUSTOMER.CustomerEmail," + 
//         " ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.DefaultAddress, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode," +
//         " ADDRESS.Country FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID = ADDRESS.CUSTOMERID" + 
//         " JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID" + 
//         " JOIN STATE ON ADDRESS.STATEID = STATE.STATEID WHERE CUSTOMER.CUSTOMERID = " + id + "AND ADDRESS.DefaultAddress = " + flag)
//     }).then (data => {
//         res.send(data.recordset)
//     }).catch(err => {
//         console.log(err)
//     })
// });

//using method above but with promises
// app.get('/customerList2', function(req, res) {
//     sql.connect(config).then(pool => {
//         return pool.request()
//             .query("SELECT * FROM CUSTOMER")
//     }).then (result => {
//         res.json(result)
//     }).catch (err => {
//         console.log(err)
//     })
// })

// app.get('/customerList/:name&:phone', function (req, res) {

//     let name = req.params.name;
//     let phone = req.params.phone;

//     sql.connect(config).then(() => {
//         //Query selects everything but we selecting specifics for tables
//         return sql.query("SELECT CUSTOMER.CustomerFirstName, CUSTOMER.CustomerLastName, CUSTOMER.CustomerPhone, ADDRESS.City, STATE.StateName "+ 
//         "FROM CUSTOMER JOIN ADDRESS ON CUSTOMER.CUSTOMERID=ADDRESS.CUSTOMERID " +
//         "JOIN CUSTOMERSTATUS ON CUSTOMER.CUSTOMERSTATUSID = CUSTOMERSTATUS.CUSTOMERSTATUSID " + 
//         "JOIN STATE ON ADDRESS.STATEID=STATE.STATEID WHERE CUSTOMER.CustomerLastName = "+name+" OR CUSTOMER.CustomerPhone = "+phone);
//     }).then (data => {
//         res.send(data.recordset);
//     }).catch(err => {
//         res.status(500).send(err);
//     })
// });


app.get('/productList', function (req, res) {
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

app.get('/orderList', function (req, res) {
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