<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px; color:white">
        <header>Edit Order</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div id="main-content" class="tab-div2" style="width:87.35% ;transform:translatex(3%)">
        <div style="border:thin solid black; height:auto" v-for="productOrder in ProductOrder"  :key="productOrder.OrderID">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                          <input type="hidden" id="cusID" v-model="productOrder.CustomerID"/>
                          <input type="hidden" id="orderID" v-model="productOrder.OrderID"/>
                          <label> Order Status</label><br/>
                          <select id="statusID" @change="statusChange($event)">
                            <option id="startStatus" hidden disabled selected :value="productOrder.OrderStatusID">{{productOrder.OrderStatusName}}</option>
                            <option id="status" v-for="orderStatus in OrderStatus" :value="orderStatus.OrderStatusID" :key="orderStatus.OrderStatusID">{{orderStatus.OrderStatusName}}</option>
                          </select><br/>
                          <label>Order Date</label><br/>
                          <input type="date" id="orderDate" :value="productOrder.OrderDate.slice(0,10)" ><br/>
                          
                          <label> Customer First Name</label><br/>
                          <input type="text" id="fname" v-model="productOrder.CustomerFirstName" readonly><br/>
                          <label> Customer Last Name</label><br/>
                          <input type="text" id="lname" v-model="productOrder.CustomerLastName" readonly><br/>
                          
                          <label> Billing Address </label><br/>
                          <select id="billingID" @change="billingChange($event)" >
                            <option hidden disabled selected v-for="billing in Billing" :value="billing.AddressID" :key="billing.AddressID">{{billing.AddressLine1.concat(', '+ billing.City + ', ' + billing.StateInitials + ', ' + billing.ZipCode)}}</option>
                            <option id="billing" v-for="address in Address" :value="address.AddressID" :key="address.AddressID">{{address.AddressLine1.concat(', '+ address.City + ', ' + address.StateInitials + ', ' + address.ZipCode)}}</option>
                          </select><br/>
                          <label> Shipping Address </label><br/>
                          <select id="shippingID" @change="shippingChange($event)" >
                            <option hidden disabled selected v-for="shipping in Shipping" :value="shipping.AddressID" :key="shipping.AddressID">{{shipping.AddressLine1.concat(', '+ shipping.City + ', ' + shipping.StateInitials + ', ' + shipping.ZipCode)}}</option>
                            <option id="shipping" v-for="address in Address" :value="address.AddressID" :key="address.AddressID">{{address.AddressLine1.concat(', '+ address.City + ', ' + address.StateInitials + ', ' + address.ZipCode)}}</option>
                          </select><br/>
                          <label> Order Notes </label><br/>
                          <textarea id="Note" v-model="productOrder.OrderNote" rows="4" cols="24"></textarea><br />
                          <label> Order Total </label><br/>
                          <input type="text" id="total" :value="productOrder.OrderTotal.toFixed(2)"><br/>
                          <input type="hidden"/>
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label> Balance Due </label><br/>
                        <input type="text" id="balance" :value="productOrder.Balance.toFixed(2)"><br/>
                        <label> Total Billed Amount </label><br/>
                        <input type="text" id="billed" @change="priceChange($event)" :value="productOrder.BilledAmount.toFixed(2)"><br/>
                        <label> Method Of Payment </label><br/>
                        <input type="text" id="method" v-model="productOrder.MethodOfPayment"><br/>
                        <label> Tracking Number </label><br/>
                        <input type="text" id="tracking" @change="trackingChange($event)" v-model="productOrder.TrackingNumber"><br/>
                        <label> Pickup </label><br/>
                        <input type="checkbox" id="pickup" v-model="productOrder.CustomerPickUp"><br/>
                        <label> Shipping/Pickup Date and Time </label><br/>
                        <input type="datetime-local" id="time1" v-if="productOrder.PickUpDateTime!==null" :value="productOrder.PickUpDateTime.slice(0,16)" ><br/>
                        <input type="datetime-local" id="time2" v-if="productOrder.PickUpDateTime===null" v-model="productOrder.PickUpDateTime" ><br/>
                        
                        
                    </form>
                </div>

                

                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <button style="transform:translate(90%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(330%,0)" v-on:click="handleSave()">Save</button>
                

        </div>

        <div> 

                    <form>
                    <table style="transform:translate(-2%,0); width:99.99%">
                        <tr style="background-color:#66A0CF">
                            <th style="width:1%"> </th>
                            <th style="text-align:right">Line Number</th>
                            <th style="width:2%"></th>
                            <th style="text-align:left">Serial Number</th>
                            <th style="width:2%"> </th>
                            <th style="text-align:right">Blade Length</th>
                            <th style="text-align:right">Blade Finish</th>
                            <th style="width:3%"> </th>
                            <th style="text-align:left">Handle Material</th>
                            <th style="text-align:left">Knife Style</th>
                            <th style="text-align:left">Type of Steel</th>
                            <th style="width:3%"> </th>
                            <th style="text-align:right">Overall Length</th>
                            <th style="text-align:right">Price ($)</th>
                            <th></th>
                            
                        </tr>
                        <tr id="oTable" v-for="lineItem in LineItem" :key="lineItem.OrderID">
                            <td> </td>
                            <td style="text-align:right">{{lineItem.LineNumber}}</td>
                            <td></td>
                            <td style="text-align:left">{{lineItem.SerialNo}}</td>
                            <td></td>
                            <td style="text-align:right">{{lineItem.BladeLength}}</td>
                            
                            <td style="text-align:left">{{lineItem.BladeFinish}}</td>
                            <td></td>
                            <td style="text-align:left">{{lineItem.HandleMaterial}}</td>
                            <td style="text-align:left">{{lineItem.StyleName}}</td>
                            <td style="text-align:left">{{lineItem.SteelName}}</td>
                            <td> </td>
                            <td style="text-align:right">{{lineItem.OverallLength.toFixed(2)}}</td>
                            <td style="text-align:right">{{lineItem.Price.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>
                            
                            <td><button type="button"  style= "height: 30px; width: 100px; max-width: 100px" v-on:click="editLineItem(lineItem.OrderID, lineItem.LineNumber)">Edit</button></td>

                        </tr>
                    </table>
                    </form>
                    <div class="tab-divider"/>
                    <div class="tab-divider"/>
                    <button type="button" style="transform:translate(37%,0)" v-on:click="openModal()"> Add Product To Order </button>

        </div>

    </div>
    
    <div id="modal" class="modal" style ="width: 50%; height: 70%; transform:translate(40%,35%);">
        <div class="tab-divider"/>
        <button id="close" class="close" style="margin-right: 20px" v-on:click="closeModal()">X</button>

            <div style="text-align:center;margin-bottom:20px; color:white">
        <header>Add Product To Order</header>
    </div>

        <div id="modal_content" class="modal_content" style="overflow:auto">
            <form>
                    <table style="transform:translate(.1%,0); width:96.5%; font-style:oblique; font-family:'Global Sans Serif';">
                        <tr>
                            <th>Serial Number</th>
                            <th>Style</th>
                            <th>Steel</th>
                            <th>Overall Length</th>
                            <th></th>
                            
                        </tr>
                        <tr id="pTable" v-for="product in Product" :value="product.ProductID" :key="product.ProductID">
                            <td>{{product.SerialNo}}</td>
                            <td>{{product.StyleName}}</td>
                            <td>{{product.SteelName}}</td>
                            <td>{{product.OverallLength}}</td>                            
                            <td><button type="button" style= "padding: 5px 10px" v-on:click="addLineItem(product.ProductID, )">Add to Order</button></td>

                        </tr>
                    </table>
                    </form>
                    <div class="tab-divider" />
            <!-- <button id="close" class="close" style="transform:translate(30%, -1590%);" v-on:click="closeModal()">X</button> -->

        </div>
    </div>

    <div id="editModal" class="modal" style="height: 60%">
 <div class="tab-divider" />
        <div style="text-align:center;margin-bottom:20px; color:white">
        <button id="close" class="close" style="margin-right: 20px" v-on:click="closeEditModal()">X</button>
        <header>Edit Order Line Item</header>
        </div>
        <div id="edit_modal_content" class="modal_content"  style="height: 75%" v-for="editItems in EditItems" :value="editItems.OrderID" :key="editItems.OrderID">

            <div style="width:50%; float:left; text-align:right; transform:translateX(-15%)">
                <input id="prodID" type="hidden" v-model="editItems.ProductID" />
                <input id="oid" type="hidden" v-model="editItems.OrderID" /><br />
                <div class="tab-divider" />
                <label> Serial Number </label>
                <input id="serialNumber" readonly type="text" v-model="editItems.SerialNo" /><br />
                <div class="tab-divider" />
                <label> Blade Length </label>
                <input id="bladeLength" readonly type="text" v-model="editItems.BladeLength" /><br />
                <div class="tab-divider" />
                <label> Blade Finish </label>
                <input id="bladeFinish" readonly type="text" v-model="editItems.BladeFinish" /><br />
                <div class="tab-divider" />
                <label> Handle Material </label>
                <input id="handleMaterial" readonly type="text" v-model="editItems.HandleMaterial" /><br />
                <div class="tab-divider" />
                <input id="lineNumber" readonly type="hidden" v-model="editItems.LineNumber" /><br />
            </div>

            <div style="margin-left:20%; text-align:right; transform:translateX(-6.5%)">

                <label> Knife Style </label>
                <input id="styleName" readonly type="text" v-model="editItems.StyleName" /><br />
                <div class="tab-divider" />
                <label> Steel Name </label>
                <input id="steelName" readonly type="text" v-model="editItems.SteelName" /><br />
                <div class="tab-divider" />
                <label> Overall Length </label>
                <input id="overallLength" readonly type="text" v-model="editItems.OverallLength" /><br />
                <div class="tab-divider" />
                <div class="tab-divider" />
                <label> Price </label>
                <input id="price" type="text" readonly v-model="editItems.Price" /><br />
                <div class="tab-divider" />
                <label> Status </label>
                <select name="statusID" id="linestatusID" @change="statusChange($event)" >
                        <option hidden disabled selected v-for="editItems in EditItems" :value="editItems.OrderLineStatusID" :key="editItems.OrderLineStatusID">{{editItems.OrderLineStatusName}}</option>
                        <option v-for="lineStatus in LineStatus" :value="lineStatus.OrderLineStatusID" :key="lineStatus.OrderLineStatusID">{{lineStatus.OrderLineStatusName}}</option>
                </select><br/>

            
            </div>
            
            <button style="transform:translate(-290%, 80%)" v-on:click="saveLineItem()">Save</button>
            <!-- <button id="close" class="close" style="transform:translate(30%,-960%)" v-on:click="closeEditModal()">X</button> -->

        </div>
    </div>
    
    
        
</div>
</template>

<script>
    import axios from 'axios'
    
    export default {

        

        data() {
            return {
                
                Address: [],
                address: {
                    AddressID: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    StateInitials: '',
                    City: '',
                    ZipCode: ''
                    //Test to add more stuff to this later
                },
                Product: [],
                product:{
                    ProductID: '',
                    SerialNo: '',
                    StyleName: '',
                    SteelName: '',
                    OverallLength: ''
                },
                ProductOrder: [],
                productOrder: {
                    //take from customer.CustomerID and add it here
                    //assign with save button when pushed using getElementById
                    OrderID: '',
                    CustomerID: '',
                    OrderStatusID: '',
                    OrderDate: ' ',
                    BillingAddressID: '',
                    ShippingAddressID: '',
                    OrderNote: '',
                    OrderTotal: 0,
                    MethodOfPayment: '',
                    BilledAmount: 0,
                    Balance: 0,
                    TrackingNumber: '',
                    CustomerPickUp: '',
                    PickUpDateTime: '',
                    
                },
                OrderStatus: [],
                orderStatus: {
                    OrderStatusID: '',
                    OrderStatusName: '',
                    OrderStatusDesc: ''
                },
                Billing: [],
                billing: {
                    AddressID: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    StateInitials: '',
                    City: '',
                    ZipCode: ''
                    //used for billing address
                },
                Shipping: [],
                shipping: {
                    AddressID: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    StateInitials: '',
                    City: '',
                    ZipCode: ''
                    //used for shipping address
                },
                LineItem: [],
                lineItem: {
                    LineNumber: '',
                    SerialNo: '',
                    BladeLength: '',
                    StyleName: '',
                    SteelName: '',
                    BladeFinish: '',
                    HandleMaterial: '',
                    OverallLength: '',
                    Price: ''
                },
                EditItems: [],
                editItems: {                    
                    LineNumber: '',
                    SerialNo: '',
                    BladeLength: '',
                    StyleName: '',
                    SteelName: '',
                    BladeFinish: '',
                    HandleMaterial: '',
                    OverallLength: '',
                    Price: '',
                    OrderLineStatusID: '',
                    OrderLineStatusName: '',
                    OrderID: '',
                    ProductID: ''
                },
                LineStatus: [],
                lineStatus: {
                    OrderLineStatusID: '',
                    OrderLineStatusName: ''
                }

            }
        },

        created() {
            let id = this.$route.params.orderID;
            let cid = this.$route.params.customerID;
            let bid = this.$route.params.billingID;
            let sid = this.$route.params.shippingID;

            let linestatuses = 'http://localhost:3000/orderLineStatus'

            axios.get(linestatuses).then((res) => {
                const statusData = res.data
                this.LineStatus = statusData
            }).catch(err => {
                console.log(err)
            })

            let lineItemURL = 'http://localhost:3000/getLineItems/' +id

            axios.get(lineItemURL).then((response) => {
                const lineItemData = response.data
                this.LineItem = lineItemData
            }).catch(err => {
                console.log(err)
            })


            let url2 = 'http://localhost:3000/getOrder/' + id + "&" + cid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.ProductOrder = data                

             }).catch(err => {
                 console.log(err)
             });

            let url = 'http://localhost:3000/getProduct';

            axios.get(url).then((response) => {
                const productData = response.data

                this.Product = productData;
                
            }).catch(err => {
                console.log(err)
            });

            //Returns all addresses associated with customer
            let url3 = 'http://localhost:3000/getAddress/' + cid;

            axios.get(url3).then((response) => {
                this.Address = response.data
                
            }).catch(err => {
                console.log(err)
            });

            //Gets order status's from status table
            let url4 = 'http://localhost:3000/getOrderStatus';

            axios.get(url4).then((response) => {
                this.OrderStatus = response.data
                
            }).catch(err => {
                console.log(err)
            });
            
            //Have a get that returns specific address for billing address ID
            let url5 = 'http://localhost:3000/getBillingAddress/' + bid;

            axios.get(url5).then((response) => {
                this.Billing = response.data
                
            }).catch(err => {
                console.log(err)
            });

            //Have a get that returns specific address for Shipping Address ID
            let url6 = 'http://localhost:3000/getShippingAddress/' + sid;

            axios.get(url6).then((response) => {
                this.Shipping = response.data
            }).catch(err => {
                console.log(err)
            })


        },

        methods: {
            home() {
                this.$router.push('/customerList')
            },

            billingChange(event) {
                this.productOrder.BillingAddressID = event.target.value
                console.log(this.productOrder.BillingAddressID)
            },

            shippingChange(event) {
                this.productOrder.ShippingAddressID = event.target.value
                console.log(this.productOrder.ShippingAddressID)
            },

            statusChange(event) {
                this.productOrder.OrderStatusID = event.target.value
                console.log(this.productOrder.OrderStatusID)
                
            },

            lineStatusChange(event) {
                this.editItems.OrderLineStatusID = event.target.value
                console.log(this.editItems.OrderLineStatusID)
            },

            saveOrderForOpen() {
                var time,
                data = document.getElementById("time1");
                if (data != null){
                    time = data.value
                    this.productOrder.PickUpDateTime = time
                }
                else{
                    this.productOrder.PickUpDateTime = null
                }

                this.productOrder.OrderStatusID = document.getElementById("statusID").value 
                this.productOrder.BillingAddressID = document.getElementById("billingID").value
                this.productOrder.ShippingAddressID = document.getElementById("shippingID").value
                this.productOrder.OrderDate = document.getElementById("orderDate").value
                this.productOrder.CustomerID = document.getElementById("cusID").value
                this.productOrder.OrderNote = document.getElementById("Note").value
                this.productOrder.OrderTotal = document.getElementById("total").value
                this.productOrder.MethodOfPayment = document.getElementById("method").value
                this.productOrder.BilledAmount = document.getElementById("billed").value
                this.productOrder.Balance = document.getElementById("balance").value
                this.productOrder.TrackingNumber = document.getElementById("tracking").value
                this.productOrder.CustomerPickUp = document.getElementById("pickup").checked
                this.productOrder.OrderID = document.getElementById("orderID").value                           
    
                console.log(this.productOrder)

                 let url = 'http://localhost:3000/updateProductOrder/';

                  axios.put(url, this.productOrder).then((response) => {
                      console.log(response)
                      
                  }).catch(err => {
                      console.log(err)
                  })
            },

            handleSave() {
                
                var time,
                data = document.getElementById("time1");
                if (data != null){
                    time = data.value
                    this.productOrder.PickUpDateTime = time
                }
                else{
                    this.productOrder.PickUpDateTime = null
                }

                this.productOrder.OrderStatusID = document.getElementById("statusID").value 
                this.productOrder.BillingAddressID = document.getElementById("billingID").value
                this.productOrder.ShippingAddressID = document.getElementById("shippingID").value
                this.productOrder.OrderDate = document.getElementById("orderDate").value
                this.productOrder.CustomerID = document.getElementById("cusID").value
                this.productOrder.OrderNote = document.getElementById("Note").value
                this.productOrder.OrderTotal = document.getElementById("total").value
                this.productOrder.MethodOfPayment = document.getElementById("method").value
                this.productOrder.BilledAmount = document.getElementById("billed").value
                this.productOrder.Balance = document.getElementById("balance").value
                this.productOrder.TrackingNumber = document.getElementById("tracking").value
                this.productOrder.CustomerPickUp = document.getElementById("pickup").checked
                this.productOrder.OrderID = document.getElementById("orderID").value                           
    
                console.log(this.productOrder)

                 let url = 'http://localhost:3000/updateProductOrder/';

                  axios.put(url, this.productOrder).then((response) => {
                      console.log(response)
                      this.$router.go(0)
                  }).catch(err => {
                      console.log(err)
                  })
            },

            addLineItem(pid) {
                let oid = document.getElementById("orderID").value
                let url = 'http://localhost:3000/addLineItem/' + oid + '&' + pid

                console.log(oid + " " + pid)

                axios.post(url).then((response) => {
                    console.log(response)
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                })
            },

            openModal() {
                this.saveOrderForOpen();
                if(document.getElementById("statusID").value >= 1 && document.getElementById("statusID").value <= 3){
                    
                    document.getElementById("modal").style.display="block";
                    document.getElementById("main-content").style.display="none";
                    
                }
                else {alert("Cannot add a Product to this Order!")}
                
                
            },

            closeModal() {
                document.getElementById("modal").style.display="none";
                document.getElementById("main-content").style.display="block";
            },

            editLineItem(orderID, lineNumber) {
            
            document.getElementById("editModal").style.display="inline-block";
            document.getElementById("main-content").style.display="none";
            
            let editlineItemURL = 'http://localhost:3000/editLineItems/' +orderID + '&' + lineNumber 

            axios.get(editlineItemURL).then((response) => {
                const editlineItemData = response.data
                this.EditItems = editlineItemData
            }).catch(err => {
                console.log(err)
            });
            },

            closeEditModal()  {
                document.getElementById("editModal").style.display="none";
                document.getElementById("main-content").style.display="block";
            },

            saveLineItem() {
                this.editItems.OrderLineStatusID = document.getElementById("linestatusID").value
                this.editItems.LineNumber = document.getElementById("lineNumber").value
                this.editItems.OrderID = document.getElementById("oid").value
                this.editItems.ProductID = document.getElementById("prodID").value

                

                let url = 'http://localhost:3000/updateLineItem/'
                axios.put(url, this.editItems).then((res) => {
                    console.log(res)
                    this.$router.go(0)
                }).catch(err => {
                    console.log(err)
                })
            },

            priceChange(event){
                let billedAmt = parseFloat(event.target.value);
                document.getElementById("billed").value = billedAmt.toFixed(2)            

                var orderTotal = parseFloat(document.getElementById("total").value)
                var balance = parseFloat(document.getElementById("balance").value)
                
                 if (billedAmt > orderTotal ) {
                     document.getElementById("billed").value = document.getElementById("total").value
                     billedAmt = orderTotal
                 }

                 document.getElementById("balance").value = (orderTotal - billedAmt).toFixed(2)
                 balance = document.getElementById("balance").value
                 
                 this.productOrder.BilledAmount = billedAmt
                 this.productOrder.Balance = document.getElementById("balance").value
                 this.productOrder.OrderTotal = orderTotal

                 if (balance == 0.00) {
                     //checks to see if balance due is 0, changes to paid
                     console.log("Paid")
                     this.productOrder.OrderStatusID = 5
                     document.getElementById("statusID").value = 5
                     //checks to see if pickup is not checked and if tracking number is in the system to set order status to shipped
                     if (!document.getElementById("pickup").checked && document.getElementById("tracking").value !== '') {
                     this.productOrder.OrderStatusID = 6
                     document.getElementById("statusID").value = 6
                    }

                 }
                 else {
                     //changes order status to in progress once an amount is billed
                     this.productOrder.OrderStatusID = 3
                     document.getElementById("statusID").value = 3
                 }
                 


                 console.log("Billed: " + this.productOrder.BilledAmount)
                 console.log("Balance: " + this.productOrder.Balance)
                 console.log("Total: " + this.productOrder.OrderTotal)
                
            },

            trackingChange(event) {
                let tracking = event.target.value
                if (tracking.length >=1 && document.getElementById("pickup").checked == false) {document.getElementById("statusID").value = 6}
                else if (tracking.length == 0 && document.getElementById("pickup").checked == true) {document.getElementById("statusID").value = 7}
            },

            cancel() {
                this.$router.push('/orderList')
            }
            
        }
        
    
    }

    

</script>


