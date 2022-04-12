<template>
<div class="form-div">

    <div style="color:white; text-align:center;margin-bottom:20px">
        <header>Create New Order</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="width:87.35% ;transform:translatex(3%)">
        <div style="border:thin solid black; height:auto">

                <div style="width:40%; float: left; transform:translate(10%,0)" v-for="customer in Customer" :key="customer.CustomerID">
                    <form>
                          <input type="hidden" id="cusID" v-model="customer.CustomerID"/>
                          <label> Order Status</label><br/>
                          <select id="status" @change="statusChange($event)">
                            <option hidden disabled selected>Please Select</option>
                            <option  v-for="orderStatus in OrderStatus" :value="orderStatus.OrderStatusID" :key="orderStatus.OrderStatusID">{{orderStatus.OrderStatusName}}</option>
                          </select><br/>
                          <label>Order Date</label><br/>
                          <input type="date" id="orderDate" v-model="productOrder.OrderDate"><br/>
                          <label> Customer First Name</label><br/>
                          <input type="text" id="fname" readonly v-model="customer.CustomerFirstName"><br/>
                          <label> Customer Last Name</label><br/>
                          <input type="text" id="lname" readonly v-model="customer.CustomerLastName"><br/>
                          <label> Product</label><br/> <!-- Populate dropdown with get for Products -->
                          <select id="product" @change="productChange($event)">
                            <option hidden disabled selected >Please Select</option>
                            <optgroup label="Serial Number Knife Style Steel Type Price" />
                            <option   v-for="product in Product" :value="product.ProductID" :key="product.ProductID">{{product.SerialNo.concat(', ' + product.StyleName + ', ' + product.SteelName + ', ' + product.Price)}}</option>
                          </select><br/>
                          <label> Billing Address </label><br/>
                          <select id="billing" @change="billingChange($event)" >
                            <optgroup label="Address, City, State, Zipcode" />
                            <option hidden selected v-for="defaultaddress in DefaultAddress" :value="defaultaddress.AddressID" :key="defaultaddress.AddressID">{{defaultaddress.AddressLine1.concat(', '+ defaultaddress.City + ', ' + defaultaddress.StateInitials + ', ' + defaultaddress.ZipCode)}}</option>
                            <option  v-for="address in Address" :value="address.AddressID" :key="address.AddressID">{{address.AddressLine1.concat(', '+ address.City + ', ' + address.StateInitials + ', ' + address.ZipCode)}}</option>
                          </select><br/>
                          <label> Shipping Address </label><br/>
                          <select id="shipping" @change="shippingChange($event)" >
                            <optgroup label="Address, City, State, Zipcode" />
                            <option hidden disabled selected v-for="defaultaddress in DefaultAddress" :value="defaultaddress.AddressID" :key="defaultaddress.AddressID">{{defaultaddress.AddressLine1.concat(', '+ defaultaddress.City + ', ' + defaultaddress.StateInitials + ', ' + defaultaddress.ZipCode)}}</option>
                            <option  v-for="address in Address" :value="address.AddressID" :key="address.AddressID">{{address.AddressLine1.concat(', '+ address.City + ', ' + address.StateInitials + ', ' + address.ZipCode)}}</option>
                          </select><br/>
                          <label> Order Notes </label><br/>
                          <textarea id="Note" placeholder="Notes" v-model="productOrder.OrderNote" rows="4" cols="24"></textarea><br />
                          <label> Order Total ($) </label><br/>
                          <div style="display:block" v-for="price in Price" :key="price.Price">
                          <input type="text" id="total" readonly :value="price.Price"><br/>
                          </div>
                          
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label> Balance ($) </label><br/>
                        <input type="text" id="balance" :value="productOrder.Balance"><br/>
                        <label> Deposit ($) </label><br/>
                        <input type="text" id="billed" @change="priceChange($event)" :value="productOrder.BilledAmount"><br/>
                        <label> Method Of Payment </label><br/>
                        <!-- <input type="text" id="method" v-model="productOrder.MethodOfPayment"><br/> -->
                        <select id="method" v-model="productOrder.MethodOfPayment">
                            <option> Card </option>
                            <option> Check </option>
                            <option> Cash </option>
                            <option> Money Order </option>
                        </select><br />
                        <label> Tracking Number </label><br/>
                        <input type="text" id="tracking" v-model="productOrder.TrackingNumber"><br/>
                        <label> Pickup </label><br/>
                        <input type="checkbox" id="pickup" v-model="productOrder.CustomerPickup"><br/>
                        <label> Shipping/Pickup Date and Time </label><br/>
                        <input type="datetime-local" id="time" v-model="productOrder.PickUpDateTime"><br/>
                        
                        
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
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>
                <button style="transform:translate(90%,0)" v-on:click="CreateOrder()">Save</button>

        </div>
    </div>
        
</div>
</template>

<script>
    import axios from 'axios'
    
    export default {

        data() {
            return {
                Customer: [],
                customer: {
                    CustomerID: '',
                    CustomerFirstName: '',
                    CustomerLastName: ''
                    },
                Address: [],
                address: {
                    AddressID: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    StateInitials: ''
                    //Test to add more stuff to this later
                },
                DefaultAddress: [],
                defaultaddress: {
                    AddressID: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    StateInitials: ''
                    //Test to add more stuff to this later
                },
                Product: [],
                product:{
                    ProductID: '',
                    SerialNo: '',
                    SteelName: '',
                    StyleName: '',
                    Price: '',
                    HandleMaterial: ''
                },
                ProductOrder: [],
                productOrder: {
                    //take from customer.CustomerID and add it here
                    //assign with save button when pushed using getElementById
                    CustomerID: '',
                    OrderStatusID: '',
                    OrderDate: new Date().toISOString().substr(0,10),
                    BillingAddressID: '',
                    ShippingAddressID: '',
                    OrderNote: '',
                    OrderTotal: 0.00.toFixed(2),
                    MethodOfPayment: '',
                    BilledAmount: 0.00.toFixed(2),
                    Balance: 0.00.toFixed(2),
                    TrackingNumber: '',
                    CustomerPickup: '',
                    PickUpDateTime: new Date().toISOString().substr(0,16),
                    ProductID: ''
                },
                OrderStatus: [],
                orderStatus: {
                    OrderStatusID: '',
                    OrderStatusName: '',
                    OrderStatusDesc: ''
                },
                Price: [],
                price: {
                    Price: "0"
                }
            }
        },
        

        created() {
    
            let cid = this.$route.params.customerID;

            let url2 = 'http://localhost:3000/getCustomer/' + cid 

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.Customer = data
                 

             }).catch(err => {
                 console.log(err)
             });

            let url = 'http://localhost:3000/getProduct';

            axios.get(url).then((response) => {
                this.Product = response.data
                
                
            }).catch(err => {
                console.log(err)
            });

            let url3 = 'http://localhost:3000/getAddress/' + cid;

            axios.get(url3).then((response) => {
                this.Address = response.data
                
            }).catch(err => {
                console.log(err)
            });

            let url4 = 'http://localhost:3000/getOrderStatus';

            axios.get(url4).then((response) => {
                this.OrderStatus = response.data
                
            }).catch(err => {
                console.log(err)
            });

            let url5 = 'http://localhost:3000/getDefaultAddress/' + cid;

            axios.get(url5).then((response) => {
                this.DefaultAddress = response.data
                
            }).catch(err => {
                console.log(err)
            });

            let url6 = 'http://localhost:3000/getProductPrice'

            axios.get(url6).then((res) => {
                this.Price = res.data
            }).catch(err => {
                console.log(err)
            });

        },

        methods: {
            home() {
                this.$router.push('/customerList')
            },

            CreateOrder() {
                
                this.productOrder.CustomerID = document.getElementById("cusID").value
                this.productOrder.OrderNote = document.getElementById("Note").value
                this.productOrder.OrderTotal = document.getElementById("total").value
                this.productOrder.MethodOfPayment = document.getElementById("method").value
                this.productOrder.BilledAmount = document.getElementById("billed").value
                this.productOrder.Balance = document.getElementById("balance").value
                this.productOrder.TrackingNumber = document.getElementById("tracking").value
                this.productOrder.CustomerPickup = document.getElementById("pickup").checked
                this.productOrder.PickUpDateTime = document.getElementById("time").value
                this.productOrder.OrderDate = document.getElementById("orderDate").value
                this.productOrder.OrderStatusID = document.getElementById("status").value
                this.productOrder.BillingAddressID = document.getElementById("billing").value
                this.productOrder.ShippingAddressID = document.getElementById("shipping").value
                this.productOrder.ProductID = document.getElementById("product").value

                console.log(this.productOrder)
                let url = 'http://localhost:3000/createOrder/';

                 axios.post(url, this.productOrder).then(() => {
                     this.$router.push('/orderList')
                      this.productOrder = {
                          //assigning all values as empty
                            CustomerID: '',
                            OrderStatusID: '',
                            OrderDate: '',
                            BillingAddressID: '',
                            ShippingAddressID: '',
                            OrderNote: '',
                            OrderTotal: '',
                            MethodOfPayment: '',
                            BilledAmount: '',
                            Balance: '',
                            TrackingNumber: '',
                            CustomerPickup: '',
                            PickUpDateTime: '',
                            ProductID: ''
                      }
                 }).catch(err => {
                     console.log(err)
                 });

                console.log(this.productOrder)
            },

            productChange(event) {
                this.productOrder.ProductID = event.target.value
                console.log(this.productOrder.ProductID)
                //getting Product Price to fill Input Value based on change of ProductID
                let url = 'http://localhost:3000/getProductPrice/' + this.productOrder.ProductID
                axios.get(url).then((res) => {
                   this.Price = res.data
                }).catch(err => {
                    console.log(err)
                })

            },

            priceChange(event){
                this.productOrder.BilledAmount = parseFloat(event.target.value)
                this.productOrder.OrderTotal = parseFloat(document.getElementById("total").value)

                if (this.productOrder.BilledAmount > this.productOrder.OrderTotal) {
                    this.productOrder.BilledAmount = this.productOrder.OrderTotal
                }

                this.productOrder.Balance = (this.productOrder.OrderTotal - this.productOrder.BilledAmount)
                console.log(this.productOrder.BilledAmount)
                console.log(this.productOrder.OrderTotal)
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
                
            }
        }
    }

</script>


