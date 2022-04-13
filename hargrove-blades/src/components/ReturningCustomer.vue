<template>
<div>
    <div class="main-title">
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        <h1 class="title">Hargrove-Blades Reports</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">On-Going Orders</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/knifeAvailability" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Knife Availability</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderInfo" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Knives in Progress</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/newsletter" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Newsletter</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/priceEstimate" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Price Estimate</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderNotification" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Notify</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/returningCustomer" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Returning Customers</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2">

            <div id="priceEstimate" class="tabcontent" style="display:block">
                
                <div style="text-align:center"><header>Number of Returning Customers</header></div>
                
                <div class="tab-divider"></div>
                

                <div class="tab-divider"></div>
                
                <div class="tab-divider"></div>

                <form>
                    <table style="width:95%; margin-left:2.5%">
                        <tr>
                            <th>Customer First Name</th>
                            <th>Customer Last Name</th>
                            <th>Phone Number</th>
                            <th>Number of Orders</th>
                            <th>Last Order Date</th>
                        </tr>
                        
                        <tr id="pTable" v-for="customer in returnCustomer" :key="customer.CustomerID">
                            <td>{{customer.CustomerFirstName}}</td>
                            <td>{{customer.CustomerLastName}}</td>
                            <td>{{customer.CustomerPhone}}</td>
                            <td>{{customer.NumberOfOrders}}</td>
                            <td>{{customer.LastOrderDate.slice(0,10)}}</td>

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
                returnCustomer: [],
                isShow: false,
                customer: {},
                //pass over to product detail to see if we are posting or editing
                
            }
        },

        methods: {

        home() {
                this.$router.push('/customerList')
            },

        knifeAvail() {
            this.$router.push('/knifeAvailability')
        },

        orderInfo() {
            this.$router.push('/orderInfo')
        },

        newsletter() {
            this.$router.push('/newsletter')
        },

        priceEstimate() {
            this.$router.push('/priceEstimate')
        },
/* 
        returnCustomer() {
            this.$router.push('/returnCustomer')
        } */

        },
    created() {
            axios.get('http://localhost:3000/returnCustomer').then((res) => {
                this.returnCustomer=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

}
</script>