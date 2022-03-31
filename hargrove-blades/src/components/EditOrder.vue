<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Edit Order</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2">
        <div style="background-color: lightgrey; height:auto" v-for="productOrder in ProductOrder" :key="productOrder.OrderID">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                          <input type="hidden" id="cusID" v-model="productOrder.CustomerID"/>
                          <label> Order Status</label><br/>
                          <select @change="statusChange($event)">
                            <option hidden disabled selected>{{productOrder.OrderStatusName}}</option>
                            <option id="status" v-for="orderStatus in OrderStatus" :value="orderStatus.OrderStatusID" :key="orderStatus.OrderStatusID">{{orderStatus.OrderStatusName}}</option>
                          </select><br/>
                          <label>Order Date</label><br/>
                          <input type="date" id="orderDate" :value="productOrder.OrderDate.slice(0,10)" ><br/>
                          
                          <label> Customer First Name</label><br/>
                          <input type="text" id="fname" v-model="productOrder.CustomerFirstName" readonly><br/>
                          <label> Customer Last Name</label><br/>
                          <input type="text" id="lname" v-model="productOrder.CustomerLastName" readonly><br/>
                          
                          <label> Billing Address </label><br/>
                          <select @change="billingChange($event)" >
                            <option hidden disabled selected v-for="billing in Billing" :value="billing.AddressID" :key="billing.AddressID">{{billing.AddressLine1.concat(', '+ billing.City + ', ' + billing.StateInitials + ', ' + billing.ZipCode)}}</option>
                            <option id="billing" v-for="address in Address" :value="address.AddressID" :key="address.AddressID">{{address.AddressLine1.concat(', '+ address.City + ', ' + address.StateInitials + ', ' + address.ZipCode)}}</option>
                          </select><br/>
                          <label> Shipping Address </label><br/>
                          <select @change="shippingChange($event)" >
                            <option hidden disabled selected v-for="shipping in Shipping" :value="shipping.AddressID" :key="shipping.AddressID">{{shipping.AddressLine1.concat(', '+ shipping.City + ', ' + shipping.StateInitials + ', ' + shipping.ZipCode)}}</option>
                            <option id="shipping" v-for="address in Address" :value="address.AddressID" :key="address.AddressID">{{address.AddressLine1.concat(', '+ address.City + ', ' + address.StateInitials + ', ' + address.ZipCode)}}</option>
                          </select><br/>
                          <label> Order Notes </label><br/>
                          <textarea id="Note" v-model="productOrder.OrderNote" rows="4" cols="24"></textarea><br />
                          <label> Order Total </label><br/>
                          <input type="text" id="total" v-model="productOrder.OrderTotal"><br/>
                          <input type="hidden"/>
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label> Balance </label><br/>
                        <input type="text" id="balance" v-model="productOrder.Balance"><br/>
                        <label> Billed Amount </label><br/>
                        <input type="text" id="billed" v-model="productOrder.BilledAmount"><br/>
                        <label> Method Of Payment </label><br/>
                        <input type="text" id="method" v-model="productOrder.MethodOfPayment"><br/>
                        <label> Tracking Number </label><br/>
                        <input type="text" id="tracking" v-model="productOrder.TrackingNumber"><br/>
                        <label> Pickup </label><br/>
                        <input type="checkbox" id="pickup" v-model="productOrder.CustomerPickUp"><br/>
                        <label> Pickup Date and Time </label><br/>
                        <input type="datetime-local" id="time1" v-if="productOrder.PickUpDateTime!==null" :value="productOrder.PickUpDateTime.slice(0,16)" ><br/>
                        <input type="datetime-local" id="time2" v-if="productOrder.PickUpDateTime===null" :value="productOrder.PickUpDateTime" ><br/>
                        
                        
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
                <button style="transform:translate(90%,0)" v-on:click="test()">Save</button>

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
                    SerialNo: ''
                },
                ProductOrder: [],
                productOrder: {
                    //take from customer.CustomerID and add it here
                    //assign with save button when pushed using getElementById
                    CustomerID: '',
                    OrderStatusID: '',
                    OrderDate: ' ',
                    BillingAddressID: '',
                    ShippingAddressID: '',
                    OrderNote: '',
                    OrderTotal: '',
                    MethodOfPayment: '',
                    BilledAmount: '',
                    Balance: '',
                    TrackingNumber: '',
                    CustomerPickUp: '',
                    PickUpDateTime: '',
                    ProductID: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    StateInitials: ''
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
            }
        },

        created() {
            let id = this.$route.params.orderID;
            let cid = this.$route.params.customerID;
            let bid = this.$route.params.billingID;
            let sid = this.$route.params.shippingID;

            
            console.log(sid)

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
                this.Product = response.data
                
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

            

            productChange(event) {
                this.productOrder.ProductID = event.target.value
                console.log(this.productOrder.ProductID)
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

            test() {
                console.log(document.getElementById("time").value)
            }
        }
    }

</script>


