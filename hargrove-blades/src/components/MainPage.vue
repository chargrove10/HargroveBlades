<template>
<div id = 'app' >
  <div class="main-title">
    
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        
    
        <h1 class="title">Hargrove Blades</h1>
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

            <div id="Customer" class="tabcontent" style="display:block">
                <div style="text-align:center"><header>Customer Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Customer Last Name</label>
                        <input type="search" id="nameValue" v-model="nameValue" placeholder="Name" class="search-field" />
                    </div>
                    <div class="cform2">
                        <label>Phone Number</label>
                        <input type="search" id="phoneValue" v-model="phoneValue" placeholder="Phone Number" class="search-field" />
                        <button v-on:click="applyFilter()" type="submit" style="margin-left:2%">Apply Filter</button>
                    
                    </div>
        
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                </div>
                
                
           
                <div class="table-div">
                    <form>
                        <table>
                            <tr>
                                
                                <th style="text-align:right">First Name</th>
                                <th style="text-align:right">Last Name</th>
                                <th style="text-align:right">Phone Number</th>
                                <th style="text-align:right">Email Address</th>
                                <th style="width:4% !important"> </th>
                                <th style="text-align:right">Notes</th>
                                <th></th>
                                <th></th>
                                
                            </tr>
                           
                            <tr id = "cTable" v-for="customer in Customers" :key="customer.CustomerID">
                                
                                <td style="text-align:right">{{customer.CustomerFirstName}}</td>
                                <td style="text-align:right">{{customer.CustomerLastName}}</td>
                                <td style="text-align:right">{{customer.CustomerPhone}}</td>
                                <td style="text-align:right">{{customer.CustomerEmail}}</td>
                                <td style="width:4% !important"> </td>
                                <td style="text-align:right">{{customer.CustomerNote}}</td>
                                
                                
                                <td><router-link :to="{ name: 'EditCustomer', params: {customerID: customer.CustomerID}}"><button style="width:40% !important;transform:translatex(130%)">Edit</button></router-link></td>
                                <td><router-link :to="{ name: 'CreateOrder', params: {customerID: customer.CustomerID}}"><button>Create Order</button></router-link></td>
                                
                                
                            </tr>
                            
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                       <!-- Fixes the button in a position on the screen so when you scroll you will always see it -->
                    <router-link :to="{ name: 'CustomerDetail' }"><button style="position: fixed; bottom: 0%; left: 11.78%">Add</button></router-link>
                    <div class="divider"></div>
                </div>
                

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>
import axios from "axios";

export default {

        data() {
            return {
                Customers: [],
                isShow: false,
                customer: {}
                //pass over to customer detail to see if we are posting or editing
                
            }
        },

        created() {

            axios.get('http://localhost:3000/customerList').then((res) => {
                this.Customers=res.data;
                
            }).catch(err => {
                console.log(err)
            });

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

            

            async applyFilter() {
                               
                let Cname = document.getElementById('nameValue').value;
                let Cphone = document.getElementById('phoneValue').value;

                

                if ((Cname ==="" || Cname === null) && (Cphone==="" || Cphone === null)) {
                    this.$router.go(0);
                }
                


                else {

                    if (Cname == "") {
                    Cname = '""'
                    console.log(Cname)
                    }
                     if (Cphone == "") {
                    Cphone = '""'
                    console.log(Cphone)
                     }

                    let url = 'http://localhost:3000/customerList/' + Cname + '&' + Cphone;
                

                    axios.get(url)
                        .then(response => {
                    
                        this.Customers=response.data
                        console.log(response.data)
                    });
                }
  
            },

            refreshPage() {
                //This is refreshing the page so that the table will load properly once he zeroes out search fields
                this.$router.go(0);

            },

        },

        

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
