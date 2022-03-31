const express = require('express');
const sql = require('mssql');
//const bodyParser = require('body-parser');
//var router = express.Router();
const cors = require('cors');


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
app.get('/cStatus', async (req,res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT CustomerStatusID, CustomerStatusName, CustomerStatusDesc FROM CustomerStatus");
        
        const status = result.recordset

        res.send(status)
        
    } catch (err){
        res.send(err)
    }
})
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
    
});

app.post('/addAddress', async (req,res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            //gather inputs
            .input('CustomerID_p', req.body.CustomerID)
            .input('AddressLine1_p',  req.body.AddressLine1)
            .input('AddressLine2_p',  req.body.AddressLine2)
            .input('DefaultAddress_p',  req.body.DefaultAddress)
            .input('City_p',  req.body.City)
            //need to pass over StateID from the dropdown
            .input('StateID_p',  req.body.StateID)
            .input('ZipCode_p',  req.body.ZipCode)
            .input('Country_p',  req.body.Country)
           
            //executes the stored procedure "AddAddress"
            .execute("dbo.Address_Create");
        const address = result.recordset;

        res.send(address)
        console.log(address)
    } catch (err){
        res.send(err)
        console.log(err)
    }

});


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

//Get Customer data based on id
app.get('/getCustomer/:id', async (req,res) => {
    let id = req.params.id;

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("Select CustomerID, CustomerFirstName, CustomerLastName FROM Customer WHERE CustomerID = " +id)

        const customer = result.recordset
        res.send(customer)
    } catch(err){
        console.log(err)
    }
});
//Get Product information for Order Creation
app.get('/getProduct', async (req,res) => {

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            .query("Select ProductID, SerialNo FROM Product WHERE ProductStatusID = 2")

        const product = result.recordset
        res.send(product)
    } catch(err){
        console.log(err)
    }
});
//Get Address information for Order Creation
app.get('/getAddress/:id', async (req,res) => {
    let id = req.params.id;

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("Select ADDRESS.AddressID, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode" +
            " FROM Address JOIN State ON ADDRESS.StateID = STATE.StateID WHERE ADDRESS.CustomerID = " +id)

        const address = result.recordset
        res.send(address)
    } catch(err){
        console.log(err)
    }
});
//Get OrderStatus Information for Order Creation
app.get('/getOrderStatus', async (req,res) => {

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("SELECT * FROM OrderStatus")

        const status = result.recordset
        res.send(status)
    } catch(err){
        console.log(err)
    }
});
//Order Creation
app.post('/createOrder', async (req,res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            //gather inputs
            .input('CustomerID_p', req.body.CustomerID)
            .input('OrderStatusID_p',  req.body.OrderStatusID)
            .input('OrderDate_p',  req.body.OrderDate)
            .input('BillingAddressID',  req.body.BillingAddressID)
            .input('ShippingAddressID',  req.body.ShippingAddressID)
            .input('OrderNote_p',  req.body.OrderNote)
            .input('OrderTotal_p',  req.body.OrderTotal)
            .input('MethodOfPayment_p',  req.body.MethodOfPayment)
            .input('BilledAmount_p', req.body.BilledAmount)
            .input('Balance_p', req.body.Balance)
            .input('TrackingNumber', req.body.TrackingNumber)
            .input('CustomerPickup_p', req.body.CustomerPickup)
            .input('PickUpDateTime', req.body.PickUpDateTime)
            .input('ProductID', req.body.ProductID)
           
            //executes the stored procedure "AddAddress"
            .execute("dbo.SP_ProductOrder_Create");
        const order = result.recordset;

        res.send(order)
        console.log(order)
    } catch (err){
        res.send(err)
        console.log(err)
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
            .input('CustomerLastName_p',  req.body.CustomerLastName)
            .input('CustomerPhone_p',  req.body.CustomerPhone)
            .input('CustomerEmail_p',  req.body.CustomerEmail)
            .input('CustomerNote_p',  req.body.CustomerNote)
            .input('AddressLine1_p', sql.VarChar,  req.body.AddressLine1)
            .input('AddressLine2_p', sql.VarChar,  req.body.AddressLine2)
            .input('DefaultAddress_p', sql.Bit,  req.body.DefaultAddress)
            .input('City_p', sql.VarChar,  req.body.City)
            //need to pass over StateID from the dropdown
            .input('StateID_p', sql.Int, req.body.StateID)
            .input('ZipCode_p', sql.VarChar,  req.body.ZipCode)
            .input('Country_p', sql.VarChar,  req.body.Country)
            .input('AddressID_p', sql.Int, req.body.AddressID)
            .input('CustomerID_p', sql.Int, req.body.CustomerID)
           
            //executes the stored procedure "GetCustomers"
            .execute("UpdateCustomer");
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

//product filtering
//Order List Filtering
app.get('/productList/:serial&:knife&:steel', async (req, res) => {

    let serial = req.params.serial;
    let knife = req.params.knife;
    let steel = req.params.steel

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT P.SerialNo, PS.ProductStatusName, style.StyleName, steel.SteelName, " + 
            "P.HandleMaterial, P.BladeLength, P.OverallLength, P.Embellishments " +
            "FROM Product P JOIN KnifeStyle style ON P.StyleID = style.StyleId " + 
            "JOIN KnifeSteel steel ON P.SteelID = steel.SteelID " + 
            "JOIN ProductStatus PS ON P.ProductStatusId = PS.ProductStatusID " +
            "WHERE p.SerialNo = " +serial+ " OR style.StyleName = " + knife + " OR steel.SteelName = " + steel);
        const customers = result.recordset;

        res.send(customers)
    } catch (err){
        res.status(500).json(err)
    }
});

//product inserting
app.post('/productAdd/', async (req,res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()

            .input('StyleID_p', sql.Int,  req.body.StyleID)
            .input('SteelID_p', sql.Int,  req.body.SteelID)
            .input('ProductStatusID_p', sql.Int, req.body.ProductStatusID)
            .input('CompleteDate_p', sql.Date,  req.body.CompleteDate)
            .input('Price_p',sql.Float, req.body.Price)
            .input('SerialNo_p', req.body.SerialNo)
            .input('OverallLength_p',sql.Float, req.body.OverallLength)
            .input('BladeFinish_p', req.body.BladeFinish)
            .input('BladeLength_p',sql.Float, req.body.BladeLength)
            .input('Embellishments_p', req.body.Embellishments)
            .input('HandleMaterial_p', req.body.HandleMaterial)
            .input('ProductNotes_p', req.body.ProductNotes)
            //sample script will be changed later
            .execute('dbo.InsertProduct')

        const product = result.recordset
        res.send(product)
    } catch (err) {
        res.send(err)
    }
});

//product Productstatus drop down
app.get('/productDropDown', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT ProductStatusID, ProductStatusName FROM ProductStatus");
        const productStatus = result.recordset;

        res.send(productStatus)
    } catch (err){
        res.status(500).json(err)
    }
});

//Knife Type Drop down
app.get('/knifeDropDown', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT StyleID, StyleName FROM KnifeStyle ORDER BY StyleID");
        const knifeStatus = result.recordset;

        res.send(knifeStatus)
    } catch (err){
        res.status(500).json(err)
    }
});

//Steel Type Drop down
app.get('/steelDropDown', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT SteelID, SteelName FROM KnifeSteel ORDER BY SteelID");
        const steelStatus = result.recordset;

        res.send(steelStatus)
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
            //only shows on screen when a null value is not shown
            .query("SELECT C.CustomerID, C.CustomerFirstName, C.CustomerLastName, PO.OrderID, PO.OrderNumber, PO.OrderDate, PO.OrderTotal, PO.Balance, PO.ShippingAddressID , PO.BillingAddressID" + 
            " FROM PRODUCTORDER PO JOIN CUSTOMER C ON C.CustomerID = PO.CustomerID");
        const orders = result.recordset;

        res.send(orders)
    } catch (err){
        res.status(500).json(err)
    }
});

//Order List Filtering
app.get('/orderList/:number&:date', async (req, res) => {

    let number = req.params.number;
    let date = req.params.date;

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT C.CustomerID, C.CustomerFirstName, C.CustomerLastName, PO.OrderID, PO.OrderNumber, PO.OrderDate, PO.OrderTotal, PO.Balance, PO.BillingAddressID, PO.ShippingAddressID "+
            "FROM PRODUCTORDER PO JOIN CUSTOMER C ON C.CustomerID = PO.CustomerID WHERE OrderNumber = " + number + "OR OrderDate = " + date);
        const customers = result.recordset;

        res.send(customers)
    } catch (err){
        res.status(500).json(err)
    }
});

//Get Order based on OrderID
app.get('/getOrder/:orderID&:custID', async (req, res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .input('CustomerID_P', req.params.custID)
            .input('OrderID_p', req.params.orderID)

            .execute('GetOrder')
        const order = result.recordset;

        res.send(order)
    } catch (err){
        res.status(500).json(err)
    }
});

//get billing address information for edit order
app.get('/getBillingAddress/:billingID', async (req,res) => {
    let id = req.params.billingID;

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("Select ADDRESS.AddressID, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode" +
            " FROM Address JOIN State ON ADDRESS.StateID = STATE.StateID WHERE ADDRESS.AddressID = " +id)

        const address = result.recordset
        res.send(address)
    } catch(err){
        console.log(err)
    }
});

//get shipping address information for edit order
app.get('/getShippingAddress/:shippingID', async (req,res) => {
    let id = req.params.shippingID;

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("Select ADDRESS.AddressID, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode" +
            " FROM Address JOIN State ON ADDRESS.StateID = STATE.StateID WHERE ADDRESS.AddressID = " +id)

        const address = result.recordset
        res.send(address)
    } catch(err){
        console.log(err)
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
            .query("SELECT SteelID, SteelName, SteelDesc, KnifeSteelActive FROM KnifeSteel");
        const blade = result.recordset;

        res.send(blade)
    } catch (err){
        res.status(500).json(err)
    }
});

app.post('/steelTypeAdd', async (req,res) =>{
    try{
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            .input('SteelName', req.body.SteelName)
            .input('KnifeSteelActive', req.body.KnifeSteelActive)
            .input('SteelDesc', req.body.SteelDesc)
            .query('INSERT INTO KnifeSteel (SteelName, KnifeSteelActive, SteelDesc) Values(@Steelname, @KnifeSteelActive, @SteelDesc) SELECT SCOPE_IDENTITY() AS SteelID');

        const steel = result.recordset;

        res.send(steel)
    } catch (err){
        console.log(err)
    }
});

app.get('/editSteelType/:id', async (req, res) => {

    let id = req.params.id
    
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT SteelID, SteelName, SteelDesc, KnifeSteelActive FROM KnifeSteel WHERE SteelID = " +id);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/steelTypeEdit/', async (req,res) => {

    // let bit = req.body.KnifeStyleActive;
    // if (bit === true) bit = 1;
    // else bit = 0;
    // console.log(bit)
    console.log(req.body.SteelID)
    console.log(req.body.SteelName)
    console.log(req.body.SteelDesc)
    console.log(req.body.KnifeSteelActive)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('SteelID_p', sql.Int, req.body.SteelID)
        .input('SteelName_p', sql.VarChar, req.body.SteelName)
        .input('SteelDesc_p', sql.VarChar, req.body.SteelDesc)
        .input('KnifeSteelActive_p', sql.Bit, req.body.KnifeSteelActive)
        .execute('UpdateKnifeSteel')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
})

//Knife Style CRUD Starts Here
app.get('/knifeStyleList', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetKnifeStyle"
            .query("SELECT * FROM KnifeStyle");
        const style = result.recordset;

        res.send(style)
    } catch (err){
        res.status(500).json(err)
    }
});

app.post('/knifeStyleAdd', async (req,res) =>{
    try{
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //Inserts into the table KnifeStyle
            .input('StyleName', req.body.StyleName)
            .input('KnifeStyleActive', req.body.KnifeStyleActive)
            .input('StyleDesc', req.body.StyleDesc)
            .query('INSERT INTO KnifeStyle (StyleName, KnifeStyleActive, StyleDesc) Values(@StyleName, @KnifeStyleActive, @StyleDesc) SELECT SCOPE_IDENTITY() AS StyleID');

        const style = result.recordset;

        res.send(style)
    } catch (err){
        console.log(err)
    }
});

app.get('/editKnifeStyle/:id', async (req, res) => {

    let id = req.params.id
    

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT StyleID, StyleName, KnifeStyleActive, StyleDesc FROM KnifeStyle WHERE StyleID = " +id);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/knifeStyleEdit/', async (req,res) => {

    // let bit = req.body.KnifeStyleActive;
    // if (bit === true) bit = 1;
    // else bit = 0;
    // console.log(bit)
    console.log(req.body.StyleID)
    console.log(req.body.StyleName)
    console.log(req.body.StyleDesc)
    console.log(req.body.KnifeStyleActive)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('StyleID_p', sql.Int, req.body.StyleID)
        .input('StyleName_p', sql.VarChar, req.body.StyleName)
        .input('StyleDesc_p', sql.VarChar, req.body.StyleDesc)
        .input('KnifeStyleActive_p', sql.Bit, req.body.KnifeStyleActive)
        .execute('UpdateKnifeStyle')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
})

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

app.get('/priceEstimate', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetNewsLetter"
            .query("SELECT StyleName, steelname, AVG(price) as 'Average' "+
            "from Product JOIN KnifeStyle  ON product.StyleID = KnifeStyle.StyleID " +
            "JOIN KnifeSteel ON KnifeSteel.SteelID = Product.SteelID Group By StyleName, Steelname "+
            "ORDER BY StyleName");
        const priceEst = result.recordset;

        res.send(priceEst)
    } catch (err){
        res.status(500).json(err)
    }
});

//Customer Status CRUD starts here
app.get('/status', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomerStatus"
            .query("SELECT CustomerStatusID, CustomerStatusName, CustomerStatusDesc FROM CustomerStatus");
        const customerStat = result.recordset;

        res.send(customerStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.post('/addCustomerStatus', async (req,res) =>{
    try{
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //Inserts into the table CustomerStatus
            .input('CustomerStatusName', req.body.CustomerStatusName)
            .input('CustomerStatusDesc', req.body.CustomerStatusDesc)
            .query('INSERT INTO CustomerStatus (CustomerStatusName, CustomerStatusDesc) Values(@CustomerStatusName, @CustomerStatusDesc) SELECT SCOPE_IDENTITY() AS CustomerStatusID');

        const cStatus = result.recordset;

        res.send(cStatus)
    } catch (err){
        console.log(err)
    }
});

app.get('/editCustomerStatus/:id', async (req, res) => {

    let id = req.params.id
    

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT CustomerStatusID, CustomerStatusName, CustomerStatusDesc FROM CustomerStatus WHERE CustomerStatusID = " +id);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/CustomerStatusEdit/', async (req,res) => {

    console.log(req.body.CustomerStatusID)
    console.log(req.body.CustomerStatusName)
    console.log(req.body.CustomerStatusDesc)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('CustomerStatusID_p', sql.Int, req.body.CustomerStatusID)
        .input('CustomerStatusName_p', sql.VarChar, req.body.CustomerStatusName)
        .input('CustomerStatuslDesc_p', sql.VarChar, req.body.CustomerStatusDesc)
        .execute('UpdateCustomerStatus')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
})

//Order Status CRUD starts here
app.get('/orderStatus', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetOrderStatus"
            .query("SELECT OrderStatusID, OrderStatusName, OrderStatusDesc FROM OrderStatus");
        const orderStat = result.recordset;

        res.send(orderStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.post('/addOrderStatus', async (req,res) =>{
    try{
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //Inserts into the table OrderStatus
            .input('OrderStatusName', req.body.OrderStatusName)
            .input('OrderStatusDesc', req.body.OrderStatusDesc)
            .query('INSERT INTO OrderStatus (OrderStatusName, OrderStatusDesc) Values(@OrderStatusName, @OrderStatusDesc) SELECT SCOPE_IDENTITY() AS OrderStatusID');

        const cStatus = result.recordset;

        res.send(cStatus)
    } catch (err){
        console.log(err)
    }
});

app.get('/editOrderStatus/:id', async (req, res) => {

    let id = req.params.id
    

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT OrderStatusID, OrderStatusName, OrderStatusDesc FROM OrderStatus WHERE OrderStatusID = " +id);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/OrderStatusEdit/', async (req,res) => {

    console.log(req.body.OrderStatusID)
    console.log(req.body.OrderStatusName)
    console.log(req.body.OrderStatusDesc)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('OrderStatusID_p', sql.Int, req.body.OrderStatusID)
        .input('OrderStatusName_p', sql.VarChar, req.body.OrderStatusName)
        .input('OrderStatuslDesc_p', sql.VarChar, req.body.OrderStatusDesc)
        .execute('UpdateOrderStatus')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
})

//Product Status CRUD starts here
app.get('/productStatus', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetProductStatus"
            .query("SELECT ProductStatusID, ProductStatusName, ProductStatusDesc FROM ProductStatus");
        const productStat = result.recordset;

        res.send(productStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.post('/addProductStatus', async (req,res) =>{
    try{
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //Inserts into the table OrderStatus
            .input('ProductStatusName', req.body.ProductStatusName)
            .input('ProductStatusDesc', req.body.ProductStatusDesc)
            .query('INSERT INTO ProductStatus (ProductStatusName, ProductStatusDesc) Values(@ProductStatusName, @ProductStatusDesc) SELECT SCOPE_IDENTITY() AS ProductStatusID');

        const cStatus = result.recordset;

        res.send(cStatus)
    } catch (err){
        console.log(err)
    }
});

app.get('/editProductStatus/:id', async (req, res) => {

    let id = req.params.id
    

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT ProductStatusID, ProductStatusName, ProductStatusDesc FROM ProductStatus WHERE ProductStatusID = " +id);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/ProductStatusEdit/', async (req,res) => {

    console.log(req.body.ProductStatusID)
    console.log(req.body.ProductStatusName)
    console.log(req.body.ProductStatusDesc)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('ProductStatusID_p', sql.Int, req.body.ProductStatusID)
        .input('ProductStatusName_p', sql.VarChar, req.body.ProductStatusName)
        .input('ProductStatusDesc_p', sql.VarChar, req.body.ProductStatusDesc)
        .execute('UpdateProductStatus')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
})

//Order Line Status CRUD starts here
app.get('/orderLineStatus', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetOrderLineStatus"
            .query("SELECT OrderLineStatusID, OrderLineStatusName, OrderLineStatusDesc FROM OrderLineStatus");
        const orderLineStat = result.recordset;

        res.send(orderLineStat)
    } catch (err){
        res.status(500).json(err)
    }
});

app.post('/addOrderLineStatus', async (req,res) =>{
    try{
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //Inserts into the table OrderStatus
            .input('OrderLineStatusName', req.body.OrderLineStatusName)
            .input('OrderLineStatusDesc', req.body.OrderLineStatusDesc)
            .query('INSERT INTO OrderLineStatus (OrderLineStatusName, OrderLineStatusDesc) Values(@OrderLineStatusName, @OrderLineStatusDesc) SELECT SCOPE_IDENTITY() AS OrderLineStatusID');

        const cStatus = result.recordset;

        res.send(cStatus)
    } catch (err){
        console.log(err)
    }
});

app.get('/editOrderLineStatus/:id', async (req, res) => {

    let id = req.params.id
    

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT OrderLineStatusID, OrderLineStatusName, OrderLineStatusDesc FROM OrderLineStatus WHERE OrderLineStatusID = " +id);
        //let customers = result.recordset;

        res.send(result.recordset)
        console.log(result.recordset)
    } catch (err){
        console.log(err)
    }
});

app.put('/OrderLineStatusEdit/', async (req,res) => {

    console.log(req.body.OrderLineStatusID)
    console.log(req.body.OrderLineStatusName)
    console.log(req.body.OrderLineStatusDesc)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('OrderLineStatusID_p', sql.Int, req.body.OrderLineStatusID)
        .input('OrderLineStatusName_p', sql.VarChar, req.body.OrderLineStatusName)
        .input('OrderLineStatusDesc_p', sql.VarChar, req.body.OrderLineStatusDesc)
        .execute('UpdateOrderLineStatus')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
})