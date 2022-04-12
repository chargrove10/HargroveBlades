<template>
<div id = 'app'>
  <div class="main-title">
    
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        
    
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Customer</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/orderList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/productList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Product</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/bladeDetails" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Blade Details</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Reports</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/status" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Status</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2" style="min-height:auto">

            <div class="tabcontent" style="display:block">
                <div style="text-align:center"><header>Order Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Order Number</label>
                        <input type="search" id="number" placeholder="Search" class="search-field" />
                       
                    </div>
                    <div class="cform2">
                        <label>Order Date</label>
                        <input type="search" id="date" placeholder="Search" class="search-field" />
                         <button type="submit" style="margin-left:2%" v-on:click="applyFilter()">Apply Filter</button>
                    
                    </div>

                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                </div>

                
                <form>
                    <table style="width:95%">
                        <tr>
                            <th style="width:3%"></th>
                            <th style="text-align:left">First Name</th>
                            <th style="text-align:left">Last Name</th>
                            <th style="width:2% !important"> </th>
                            <th style="text-align:right">Order Number</th>
                            <th style="text-align:right">Order Date</th>
                            <th style="width:4% !important"> </th>
                            <th style="text-align:right">Order Total</th>
                            <th style="text-align:right">Balance</th>
                            <th style="width:.1% !important"></th>
                            <th style="width:1% !important"></th>
                            <th></th>
                        </tr>
                        <tr id="oTable" v-for="orders in Orders" :key="orders.OrderID">
                            <td></td>
                            <td style="text-align:left">{{orders.CustomerFirstName}}</td>
                            <td style="text-align:left">{{orders.CustomerLastName}}</td>
                            <td style="width:4% !important"> </td>
                            <td style="text-align:right">{{orders.OrderNumber}}</td>
                            <td style="text-align:right">{{orders.OrderDate.slice(0,10)}}</td>
                            <td style="width:4% !important"> </td>
                            <td style="text-align:right">{{orders.OrderTotal.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>
                            <td style="text-align:right;">{{orders.Balance.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>
                            <td style="display:none">{{orders.CustomerID}}</td>
                            <td style="width:.01% !important"><input type="hidden" v-model="orders.ShippingAddressID"></td>
                            <td ><input type="hidden" v-model="orders.BillingAddressID"></td>
                            
                            
                            
                            <!--IS GOING TO GO TO EDIT ORDER-->
                            <td><router-link :to="{ name: 'EditOrder', params: {orderID: orders.OrderID, customerID: orders.CustomerID, shippingID: orders.ShippingAddressID, billingID: orders.BillingAddressID}}"><button style="width:30%">Edit</button></router-link></td>
                            
                            <!-- Place holder !-->
                        </tr>
                    </table>
                </form>

                <div class="tab-divider"></div>
                

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>
import axios from 'axios'


export default {
        data() {
            return {
                Orders: [],
                isShow: false,
                orders: {
                    
                }
                //pass over to product detail to see if we are posting or editing
                
            }
        },

        methods: {

            product() {
                this.$router.push('/productList')
            },

            reports() {
                this.$router.push('/')
            },

            bladeDetails() {
                this.$router.push('/bladeDetails')
            },

            order() {
                this.$router.push('/orderList')
            },

            customer() {
                this.$router.push('/customerList')
            },

            async applyFilter() {
                               
                let number = document.getElementById("number").value;
                let date = document.getElementById("date").value;

                if (number == "")
                    number = '""'
                if (date == "")
                    date = '0'

                if ((number =="" || number ==null) & (date =="" || date==null)) {
                    this.refreshPage();
                }
                
                //this is the link to filter by the fields selected
                let url = 'http://localhost:3000/orderList/' + number + '&' + date;
                console.log(url)
                

                axios.get(url)
                    .then(response => {
                    
                    this.Orders=response.data
                    console.log(response.data)
                });
  
            },

            refreshPage() {
                //This is refreshing the page so that the table will load properly once he zeroes out search fields
                this.$router.go(0);

            },

        },
        created() {

            axios.get('http://localhost:3000/orderList').then((res) => {
                this.Orders=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
