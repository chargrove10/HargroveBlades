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
app.use(express.urlencoded({extended: false}))

//router.use(cors())
//router.use(bodyParser)

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

// //Bryan Comnputer
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
            .query("SELECT CustomerStatusID, CustomerStatusName, CustomerStatusDesc FROM CustomerStatus WHERE CustomerStatusActive = 1");
        
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
//Edit Address
app.put('/editAddress/', async (req,res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()

            //gather inputs
            .input('AddressID_p', sql.Int, req.body.AddressID)
            .input('DefaultAddress_p', sql.Bit, req.body.DefaultAddress)
            .input('AddressLine1_p', sql.VarChar, req.body.AddressLine1)
            .input('AddressLine2_p', sql.VarChar,  req.body.AddressLine2)
            .input('City_p', sql.VarChar, req.body.City)
            .input('StateID_p', sql.Int, req.body.StateID)
            .input('Country_p', sql.VarChar, req.body.Country)
            .input('CustomerID_p', sql.Int, req.body.CustomerID)
            .input('AddressActive_p', sql.Bit, req.body.AddressActive)
            //execute stored procedure updateAddress
            .execute('updateAddress')

        console.log(result.recordset)
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
            .query("Select * From Customer C JOIN CustomerStatus CS ON C.CustomerStatusID = CS.CustomerStatusID WHERE CS.CustomerStatusID <> 2 ORDER BY C.CustomerLastName ASC");
        const customers = result.recordset;

        res.send(customers)
    } catch (err){
        res.status(500).json(err)
    }
});

//get Customer Status
app.get('/customerStatus/:customerID', async (req, res) => {
    let id = req.params.customerID
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("SELECT CustomerStatus.CustomerStatusID, CustomerStatus.CustomerStatusName "+
            "FROM Customer JOIN CustomerStatus ON Customer.CustomerStatusID = CustomerStatus.CustomerStatusID " + 
            "WHERE Customer.CustomerID = " + id);
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
            .input ('name_p', name)
            .input ('phone_p', phone)
            .execute ('customerFilter')
        const customers = result.recordset;
        console.log(customers)
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

            // .query("Select ProductID, SerialNo FROM Product WHERE ProductStatusID = 2")
            .query("SELECT Product.ProductID, Product.SerialNo, Product.OverallLength, KnifeSteel.SteelName, KnifeStyle.StyleName, " +
            "Product.Price, Product.HandleMaterial FROM Product " +
            "JOIN KnifeStyle ON Product.StyleID = KnifeStyle.StyleID " + 
            "JOIN KnifeSteel ON Product.SteelID = KnifeSteel.SteelID " + 
            "WHERE Product.ProductStatusID = 1 OR Product.ProductStatusID = 2")
            //Might change to fit a better ProductStatus

        const product = result.recordset
        res.send(product)
    } catch(err){
        console.log(err)
    }
});
//Gets price for product to fill in input value
app.get('/getProductPrice/:id', async (req,res) => {

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            .query("SELECT Price FROM Product WHERE ProductID = " + req.params.id)

        const product = result.recordset
        res.send(product)
    } catch(err){
        console.log(err)
    }
});

app.get('/getProductPrice', async (req,res) => {

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            .output('Price', null)
            .execute('GetProductPrice')

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
            .query("Select ADDRESS.AddressID, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode, ADDRESS.Country, ADDRESS.DefaultAddress" +
            " FROM Address JOIN State ON ADDRESS.StateID = STATE.StateID WHERE ADDRESS.CustomerID = " +id + " AND Address.AddressActive = 1")

        const address = result.recordset
        res.send(address)
    } catch(err){
        console.log(err)
    }
});
//Get Default Address information for Order Creation
app.get('/getDefaultAddress/:id', async (req,res) => {
    let id = req.params.id;

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("Select ADDRESS.AddressID, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode, ADDRESS.Country, ADDRESS.DefaultAddress" +
            " FROM Address JOIN State ON ADDRESS.StateID = STATE.StateID WHERE ADDRESS.CustomerID = " +id+ " AND ADDRESS.DefaultAddress = 'true'")

        const address = result.recordset
        res.send(address)
    } catch(err){
        console.log(err)
    }
});
//Get address information based on AddressID
app.get('/Address/:id', async (req,res) => {
    let id = req.params.id;

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("Select ADDRESS.CustomerID, ADDRESS.AddressID, ADDRESS.AddressActive, ADDRESS.AddressLine1, ADDRESS.AddressLine2, ADDRESS.City, STATE.StateInitials, ADDRESS.ZipCode, ADDRESS.Country, ADDRESS.DefaultAddress" +
            " FROM Address JOIN State ON ADDRESS.StateID = STATE.StateID WHERE ADDRESS.AddressID = " +id)

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

app.get('/getProductStatus', async (req,res) => {

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

            //might need to make it so customerstatus is active here or on the main screen
            .query("SELECT * FROM ProductStatus")

        const status = result.recordset
        res.send(status)
    } catch(err){
        console.log(err)
    }
});

//Order Creation
app.post('/createOrder/', async (req,res) => {

    //This is not functioning as intended

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            //gather inputs
            .input('CustomerID_p', sql.Int, req.body.CustomerID)
            .input('OrderStatusID_p', sql.Int, req.body.OrderStatusID)
            .input('OrderDate_p', sql.Date, req.body.OrderDate)
            .input('BillingAddressID_p', sql.Int, req.body.BillingAddressID)
            .input('ShippingAddressID_p', sql.Int, req.body.ShippingAddressID)
            .input('OrderNote_p', sql.VarChar, req.body.OrderNote)
            // .input('OrderTotal_p',  req.body.OrderTotal)
            .input('MethodOfPayment_p', sql.VarChar, req.body.MethodOfPayment)
            .input('BilledAmount_p',sql.Float, req.body.BilledAmount)
            .input('Balance_p', sql.Float, req.body.Balance)
            .input('TrackingNumber_p', sql.VarChar, req.body.TrackingNumber)
            .input('CustomerPickup_p', sql.Bit, req.body.CustomerPickup)
            .input('PickUpDateTime_p', sql.DateTime, req.body.PickUpDateTime)
            .input('ProductID_p', sql.Int, req.body.ProductID)
            .input('ProductList_p',  null)
            .input('BulkCreate_p', sql.Bit, 0)
           
            //executes the stored procedure "AddAddress"
            .execute("SP_ProductOrder_Create");
        const order = result.recordsets;

        res.send(order)
        console.log(order)
    } catch (err){
        res.send(err)
        console.log(err)
    }

});

app.get('/editCustomer/:id', async (req, res) => {

    let id = req.params.id
    

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .query("Select C.CustomerID, C.CustomerFirstName, C.CustomerLastName, C.CustomerPhone, C.CustomerEmail, C.CustomerNote " +  
            "From Customer C JOIN CustomerStatus CS ON C.CustomerStatusID = CS.CustomerStatusID " + 
            "WHERE C.CustomerID = " + id);
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
            .input('CustomerID_p', sql.Int, req.body.CustomerID)
            .input('CustomerStatusID_p', sql.Int, req.body.CustomerStatusID)
           
            //executes the stored procedure "GetCustomers"
            .execute("UpdateCustomerInfo");
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
            .query("SELECT P.ProductID, P.SerialNo, PS.ProductStatusID, PS.ProductStatusName, style.StyleID, style.StyleName, steel.SteelID, steel.SteelName, " + 
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

//gets product by ID
app.get('/editProduct/:id', async (req, res) =>{
    let id = req.params.id
    
    try{
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
        .query("SELECT P.ProductID, P.SerialNo, PS.ProductStatusID, PS.ProductStatusName, style.StyleID, style.StyleName, steel.SteelID, steel.SteelName, " + 
        "P.HandleMaterial, P.BladeLength, P.OverallLength, P.Embellishments, P.CompleteDate, P.Price, P.BladeFinish, P.ProductNote " +
        "FROM Product P JOIN KnifeStyle style ON P.StyleID = style.StyleId " + 
        "JOIN KnifeSteel steel ON P.SteelID = steel.SteelID " + 
        "JOIN ProductStatus PS ON P.ProductStatusId = PS.ProductStatusID WHERE P.ProductID =" +id);

        res.send(result.recordset)
    }catch (err){
        console.log(err)
    }
});

//edits product
app.put('/editProduct/', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            //gather inputs
            .input('ProductID_p', sql.Int, req.body.ProductID)
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
            .input('ProductNote_p', req.body.ProductNote)
           
            //executes the stored procedure "GetCustomers"
            .execute("SP_Product_Update");
        const product = result.recordset;

        res.send(product)
        console.log(product)
    } catch (err){
        res.send(err)
        console.log(err)
    }
});

//product filtering

app.get('/productList/:serial&:knife&:steel', async (req, res) => {

    let steelName = req.params.steel
    let serialNo = req.params.serial
    let knifeStyle = req.params.knife

    if (knifeStyle === '""')
        knifeStyle = ''

    if (serialNo === '""')
        serialNo = ''

    if (steelName === '""')
        steelName = ''

    console.log(steelName + ' ' + serialNo + ' ' + knifeStyle)

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            
            .input('SerialNo_p', serialNo)
            .input('KnifeStyleName_p', knifeStyle)
            .input('SteelName_p', steelName)

            .execute('productFilter')
        const order = result.recordset;
        console.log(order)
        res.send(order)
    } catch (err){
        console.log(err)
    }
});

//product inserting
app.post('/productAdd/', async (req,res) => {
    try {
        console.log('in Product app.js')
        console.log('styleId:' + req.body.StyleID)
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
            .execute('dbo.SP_Product_Create')
        const product = result.recordset
        console.log('after add product')
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
            .query("SELECT C.CustomerID, C.CustomerFirstName, C.CustomerLastName, OS.OrderStatusName, PO.OrderID, PO.OrderNumber, PO.OrderDate, PO.OrderTotal, PO.Balance, PO.ShippingAddressID , PO.BillingAddressID" + 
            " FROM PRODUCTORDER PO JOIN CUSTOMER C ON C.CustomerID = PO.CustomerID JOIN ORDERSTATUS OS ON PO.OrderStatusID = OS.OrderStatusID  ORDER BY PO.OrderDate DESC");
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
            .input('number_p', number)
            .input('date_p', sql.Date, date)
            .execute('orderFilter')
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
            .input('CustomerID_p', req.params.custID)
            .input('OrderID_p', req.params.orderID)

            .execute('GetOrder')
        const order = result.recordset;

        res.send(order)
    } catch (err){
        console.log(err)
    }
});

//add Line Item to Order
app.post('/addLineItem/:orderID&:productID', async (req, res) => {

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the stored procedure "GetCustomers"
            .input('OrderID_p', req.params.orderID)
            .input('ProductID_p', req.params.productID)

            .execute('SP_OrderLine_Create')
        const lineItem = result.recordset;

        res.send(lineItem)
    } catch (err){
        console.log(err)
    }
});

//Get LineItems for Order
app.get('/getLineItems/:lineID', async (req, res) => {

    let lineID = req.params.lineID

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            .query("select OLI.OrderID, OLI.LineNumber, OLI.OrderLineStatusID, P.SerialNo, P.BladeLength, P.HandleMaterial, P.BladeFinish, P.OverallLength ,style.StyleName, steel.SteelName, P.Price " +
            "from OrderLineItem OLI "+
            "join Product P on OLI.ProductID = P.ProductID "+
            "join KnifeStyle style on P.StyleID = style.StyleID "+
            "join KnifeSteel steel on P.SteelID = steel.SteelID "+
            "WHERE OLI.OrderID = "+lineID+ " AND OLI.OrderLineStatusID != 3")
        const lineItems = result.recordset;

        res.send(lineItems)
    } catch (err){
        res.status(500).json(err)
    }
});

//get LineItem Information for Edit
app.get('/editLineItems/:orderID&:lineNum', async (req, res) => {

    let orderID = req.params.orderID
    let lineNum = req.params.lineNum

    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            .query("select OLI.OrderID, OLI.LineNumber, P.ProductID, P.SerialNo, P.BladeLength, P.HandleMaterial, P.BladeFinish, P.OverallLength ,style.StyleName, steel.SteelName, P.Price, " +
            "OLS.OrderLineStatusID, OLS.OrderLineStatusName from OrderLineItem OLI "+
            "join Product P on OLI.ProductID = P.ProductID "+
            "join KnifeStyle style on P.StyleID = style.StyleID "+
            "join KnifeSteel steel on P.SteelID = steel.SteelID "+ 
            "join OrderLineStatus OLS on OLI.OrderLineStatusID = OLS.OrderLineStatusID " +
            "WHERE OLI.OrderID = "+orderID + " AND OLI.LineNumber = " +lineNum)
        const lineItems = result.recordset;

        res.send(lineItems)
    } catch (err){
        res.status(500).json(err)
    }
});

//get OrderLineStatus information
app.get('/orderLineStatus', async (req,res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
            .query("Select OrderLineStatusID, OrderLineStatusName, OrderLineStatusDesc, OrderLineStatusActive FROM OrderLineStatus")
        const lineStatus = result.recordset;

        res.send(lineStatus)
    } catch (err){
        res.status(500).json(err)
    }
});

//update OrderLineItem with Status
app.put('/updateLineItem/', async (req,res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
           
        .input('LineNumber_p', req.body.LineNumber)
        .input('OrderLineStatusID_p', req.body.OrderLineStatusID)
        .input('OrderID_p', req.body.OrderID)
        .input('ProductID_p', req.body.ProductID)

        .execute('SP_OrderLine_Update')

        res.send(result)
    } catch (err){
        res.status(500).json(err)
    }
})

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

//Update ProductOrder
app.put('/updateProductOrder', async (req,res) => {
    console.log(req.body.OrderNote)
    console.log(req.body.OrderID)
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
        
           
            //gather inputs
             .input('CustomerID_p',  req.body.CustomerID)
             .input('OrderID_p',  req.body.OrderID)
             .input('BillingAddressID_p',  req.body.BillingAddressID)
             .input('ShippingAddressID_p',  req.body.ShippingAddressID)
             .input('OrderDate_p', sql.Date,  req.body.OrderDate)
             .input('OrderStatusID_p',  req.body.OrderStatusID)
             .input('OrderNote_p', sql.VarChar,  req.body.OrderNote)
             .input('MethodOfPayment_p',  req.body.MethodOfPayment)
             .input('BilledAmount_p',  req.body.BilledAmount)
             .input('Balance_p',  req.body.Balance)
             .input('TrackingNumber_p',  req.body.TrackingNumber)
             .input('CustomerPickUp_p', sql.Bit, req.body.CustomerPickUp)
             .input('PickUpDateTime_p', sql.DateTime,  req.body.PickUpDateTime)
             
            
            //executes the stored procedure for updating a product order
            .execute("SP_ProductOrder_Update");
        const productOrder = result.recordset;

        
        res.send(productOrder)
        console.log(productOrder)
    } catch (err){
        res.send(err)
        console.log(err)
    }
})

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
            "join KnifeSteel ON PRODUCT.steelID = KnifeSteel.SteelID WHERE Product.productstatusID= 6;");
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
            .query("SELECT CustomerStatusID, CustomerStatusName, CustomerStatusDesc, CustomerStatusActive FROM CustomerStatus");
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
            .input('CustomerStatusActive', req.body.CustomerStatusActive)
            .query('INSERT INTO CustomerStatus (CustomerStatusName, CustomerStatusDesc, CustomerStatusActive) Values(@CustomerStatusName, @CustomerStatusDesc, @CustomerStatusActive) SELECT SCOPE_IDENTITY() AS CustomerStatusID');

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
            .query("SELECT CustomerStatusID, CustomerStatusName, CustomerStatusDesc, CustomerStatusActive FROM CustomerStatus WHERE CustomerStatusID = " +id);
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
    console.log(req.body.CustomerStatusActive)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('CustomerStatusID_p', sql.Int, req.body.CustomerStatusID)
        .input('CustomerStatusName_p', sql.VarChar, req.body.CustomerStatusName)
        .input('CustomerStatuslDesc_p', sql.VarChar, req.body.CustomerStatusDesc)
        .input('CustomerStatusActive_p', sql.Bit, req.body.CustomerStatusActive)
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
            .query("SELECT OrderStatusID, OrderStatusName, OrderStatusDesc, OrderStatusActive FROM OrderStatus");
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
            .input('OrderStatusActive', req.body.OrderStatusActive)
            .query('INSERT INTO OrderStatus (OrderStatusName, OrderStatusDesc, OrderStatusActive) Values(@OrderStatusName, @OrderStatusDesc, @OrderStatusActive) SELECT SCOPE_IDENTITY() AS OrderStatusID');

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
            .query("SELECT OrderStatusID, OrderStatusName, OrderStatusDesc, OrderStatusActive FROM OrderStatus WHERE OrderStatusID = " +id);
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
    console.log(req.body.OrderStatusActive)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('OrderStatusID_p', sql.Int, req.body.OrderStatusID)
        .input('OrderStatusName_p', sql.VarChar, req.body.OrderStatusName)
        .input('OrderStatuslDesc_p', sql.VarChar, req.body.OrderStatusDesc)
        .input('OrderStatusActive_p', sql.Bit, req.body.OrderStatusActive)
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
            .query("SELECT ProductStatusID, ProductStatusName, ProductStatusDesc, ProductStatusActive FROM ProductStatus");
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
            .input('ProductStatusActive', req.body.ProductStatusActive)
            .query('INSERT INTO ProductStatus (ProductStatusName, ProductStatusDesc, ProductStatusActive) Values(@ProductStatusName, @ProductStatusDesc, @ProductStatusActive) SELECT SCOPE_IDENTITY() AS ProductStatusID');

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
            .query("SELECT ProductStatusID, ProductStatusName, ProductStatusDesc, ProductStatusActive FROM ProductStatus WHERE ProductStatusID = " +id);
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
    console.log(req.body.ProductStatusActive)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('ProductStatusID_p', sql.Int, req.body.ProductStatusID)
        .input('ProductStatusName_p', sql.VarChar, req.body.ProductStatusName)
        .input('ProductStatusDesc_p', sql.VarChar, req.body.ProductStatusDesc)
        .input('ProductStatusActive_p', sql.Bit, req.body.ProductStatusActive)
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
            .query("SELECT OrderLineStatusID, OrderLineStatusName, OrderLineStatusDesc, OrderLineStatusActive FROM OrderLineStatus");
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
            .input('OrderLineStatusActive', req.body.OrderLineStatusActive)
            .query('INSERT INTO OrderLineStatus (OrderLineStatusName, OrderLineStatusDesc, OrderLineStatusActive) Values(@OrderLineStatusName, @OrderLineStatusDesc, @OrderLineStatusActive) SELECT SCOPE_IDENTITY() AS OrderLineStatusID');

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
            .query("SELECT OrderLineStatusID, OrderLineStatusName, OrderLineStatusDesc, OrderLineStatusActive FROM OrderLineStatus WHERE OrderLineStatusID = " +id);
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
    console.log(req.body.OrderLineStatusActive)

    try {
        let pool = await sql.connect(config)

        let result = await pool.request()

        .input('OrderLineStatusID_p', sql.Int, req.body.OrderLineStatusID)
        .input('OrderLineStatusName_p', sql.VarChar, req.body.OrderLineStatusName)
        .input('OrderLineStatusDesc_p', sql.VarChar, req.body.OrderLineStatusDesc)
        .input('OrderLineStatusActive_p', sql.Bit, req.body.OrderLineStatusActive)
        .execute('UpdateOrderLineStatus')

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
});

// Customer Purchase History
app.get('/customerHist/:customerID', async (req,res) => {
    let id = req.params.customerID;
    try {
        let pool = await sql.connect(config)

        let result = await pool.request()
            .query("SELECT CustomerFirstName, CustomerLastName, Customer.CustomerID, OrderID,OrderNumber,OrderDate, OrderStatus.OrderStatusName  "+
            ",ISNULL((SELECT OrderStatusName FROM OrderStatus WHERE OrderStatusID = LastOrderStatusNotified), '-') "+
            " AS LastOrderStatusNotified , OrderNote, OrderTotal, Balance "+
          " FROM HargroveBlades.dbo.ProductOrder JOIN OrderStatus  ON ProductOrder.OrderStatusID = OrderStatus.OrderStatusID "+
          "JOIN Customer  ON Customer.CustomerID = ProductOrder.CustomerID WHERE Customer.CustomerID =  " + id)

        const customerHist = result.recordset
        res.send(customerHist)
    } catch(err){
        console.log(err)
    }
});

// update Last Notified Status //VanPhan
app.put('/LastNotifiedStatusEdit/', async (req,res) => {
    try {
        let pool = await sql.connect(config)
        let result = await pool.request()
        .input('OrderID', sql.Int, req.body.OrderID)
        .query('UPDATE ProductOrder SET LastOrderStatusNotified = (SELECT OrderStatusID FROM ProductOrder WHERE OrderID = ' + req.body.OrderID  +') WHERE OrderID = '+ req.body.OrderID )

        res.send(result.recordset)
        console.log(result.recordset)

    }catch(err) {
        console.log(err)
    }
});

app.get('/returnCustomer', async (req, res) => {
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            .query("SELECT Customer.CustomerID, CustomerFirstName, CustomerLastName, CustomerPhone, COUNT(OrderID) AS NumberOfOrders, MAX(OrderDate) AS 'LastOrderDate'  " +
            " FROM Customer JOIN ProductOrder ON customer.customerID = Productorder.customerID " +
            "GROUP BY Customer.CustomerID, CustomerFirstName, CustomerLastName, CustomerPhone HAVING COUNT(OrderID) >=2");
        const returnCust = result.recordset;

        res.send(returnCust)
    } catch (err){
        res.status(500).json(err)
    }
});


app.get('/monthlyTotal', async (req, res) => {  //VanPhan
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the view orderNotify
            .query("SELECT NoOfOrder, Year, Month, MonthYear,  MonthlyTotal FROM MonthlyTotal ORDER BY  'Year', 'Month' ASC");
        const monthlyTotal = result.recordset;

        res.send(monthlyTotal)
    } catch (err){
        res.status(500).json(err)
    }
});

app.get('/orderNotify', async (req, res) => {  //VanPhan
    try {
        //making 'pool' awaiting the connection
        let pool = await sql.connect(config)
        //making result awaiting the request to the connection
        let result = await pool.request()
            //executes the view orderNotify
            .query("SELECT * FROM OrderNotify");
        const orderNotify = result.recordset;

        res.send(orderNotify)
    } catch (err){
        res.status(500).json(err)
    }
}); 