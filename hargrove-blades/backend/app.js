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

//Chris Computer
// var config = {
//     user: 'CZ',
//     password: 'CZ1',
//     server: 'DESKTOP-O78Q1FG',
//     database: 'HargroveBlades',
//     port: 1433,
//     options: {
//         trustServerCertificate: true
//     }
// }

//Bryan Comnputer
// var config = {
//     user: 'BG2',
//     password: 'BG2',
//     server: 'DESKTOP-94E3EIO',
//     database: 'HargroveBlades',
//     port: 1433,
//     options: {
//         trustServerCertificate: true
//     }
// }

//customer List Page

//populates drop down list
//Customer CRUD Starts Here
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



//Product CRUD Starts Here
app.get('/productList', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetProducts"
            .query("SELECT P.SerialNo, PS.ProductStatusName, style.StyleName, steel.SteelName, " + 
            "P.HandleMaterial, P.BladeLength, P.OverallLength, P.Embellishments " +
            "FROM Product P JOIN KnifeStyle style ON P.StyleID = style.StyleId " + 
            "JOIN KnifeSteel steel ON P.SteelID = steel.SteelID " + 
            "JOIN ProductStatus PS ON P.ProductStatusId = PS.ProductStatusID");
        const products = result.recordset;

        res.send(products)
    } catch (err){
        res.status(500).json(err)
    }
});





//Order CRUD starts here
app.get('/orderList', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetOrders"
            .query("SELECT C.CustomerFirstName, C.CustomerLastName, PO.OrderNumber, PO.OrderDate, PO.OrderTotal, PO.Balance "+
            "FROM PRODUCTORDER PO JOIN CUSTOMER C ON C.CustomerID = PO.CustomerID");
        const orders = result.recordset;

        res.send(orders)
    } catch (err){
        res.status(500).json(err)
    }
});

//Blade Detail CRUD Starts Here
app.get('/bladeDetails', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetKnifeSteel"
            .query("SELECT SteelName, SteelDesc, KnifeSteelActive FROM KnifeSteel");
        const blade = result.recordset;

        res.send(blade)
    } catch (err){
        res.status(500).json(err)
    }
});

//Knife Style CRUD Starts Here
app.get('/knifeStyleList', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetKnifeStyle"
            .query("SELECT StyleName, StyleDesc, KnifeStyleActive FROM KnifeStyle");
        const style = result.recordset;

        res.send(style)
    } catch (err){
        res.status(500).json(err)
    }
});


//Reports Start Here
app.get('/', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetReportMain"
            .query("SELECT OrderNumber ,CustomerFirstName, CustomerLastName, CustomerPhone ,CustomerEmail ,OrderDate ,OrderStatusName, OrderTotal ,PickUpDateTime ,OrderNote "+
            "FROM ProductOrder JOIN Customer ON ProductOrder.CustomerID = Customer.CustomerID JOIN OrderStatus ON ProductOrder.OrderStatusID = OrderStatus.OrderStatusID " +
            "WHERE ProductOrder.OrderStatusID IN (2, 3) ORDER BY ProductOrder.OrderStatusID, OrderDate ASC");
        const order = result.recordset;

        res.send(order)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/knifeAvailability', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetKnivesAvailable"
            .query("SELECT SerialNo, StyleName, SteelName, overalllength, bladelength, handlematerial, embellishments, productnote, Price, ProductStatusName "+
            "FROM PRODUCT JOIN PRODUCTSTATUS ON PRODUCT.ProductStatusID = ProductStatus.productstatusID join KnifeStyle ON PRODUCT.StyleID = KnifeStyle.StyleID "+
            "join KnifeSteel ON PRODUCT.steelID = KnifeSteel.SteelID WHERE Product.productstatusID = 2");
        const knifeAvail = result.recordset;

        res.send(knifeAvail)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/orderInfo', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetOrderInfo"
            .query("SELECT SerialNo, StyleName, SteelName, overalllength, bladelength, handlematerial, embellishments, productnote, Price, ProductStatusName "+
            "FROM PRODUCT JOIN PRODUCTSTATUS ON PRODUCT.ProductStatusID = ProductStatus.productstatusID join KnifeStyle ON PRODUCT.StyleID = KnifeStyle.StyleID "+
            "join KnifeSteel ON PRODUCT.steelID = KnifeSteel.SteelID WHERE Product.productstatusID= 1  OR Product.productstatusID= 3;");
        const knifeAvail = result.recordset;

        res.send(knifeAvail)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/newsletter', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetNewsLetter"
            .query("SELECT StyleName, BladeFinish, HandleMaterial, OverallLength, BladeLength, Embellishments, CustomerFirstName, CustomerLastName, CustomerEmail, CustomerStatusName "+
            "from Product JOIN KnifeStyle ON product.StyleID = KnifeStyle.StyleID JOIN OrderLineItem ON product.ProductID = OrderLineItem.ProductID "+
            "JOIN ProductOrder ON OrderLineItem.OrderID = ProductOrder.OrderID JOIN Customer on ProductOrder.CustomerID = Customer.CustomerID "+
            "JOIN CustomerStatus on Customer.CustomerStatusID = CustomerStatus.CustomerStatusID");
        const newsLetter = result.recordset;

        res.send(newsLetter)
    } catch (err){
        res.status(500).json(err)
    }
});



//Status CRUD starts here
app.get('/status', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomerStatus"
            .query("SELECT CustomerStatusName, CustomerStatusDesc FROM CustomerStatus");
        const customerStat = result.recordset;

        res.send(customerStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/orderStatus', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetOrderStatus"
            .query("SELECT OrderStatusName, OrderStatusDesc FROM OrderStatus");
        const orderStat = result.recordset;

        res.send(orderStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/productStatus', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetProductStatus"
            .query("SELECT ProductStatusName, ProductStatusDesc FROM ProductStatus");
        const productStat = result.recordset;

        res.send(productStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/orderLineStatus', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetOrderLineStatus"
            .query("SELECT OrderLineStatusName, OrderLineStatusDesc FROM OrderLineStatus");
        const orderLineStat = result.recordset;

        res.send(orderLineStat)
    } catch (err){
        res.status(500).json(err)
    }
});