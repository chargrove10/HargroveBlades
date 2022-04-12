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
                <router-link to="/monthlyTotal" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Monthly Report</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderNotification" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Notify</a>
                </router-link>

            </div>

        </div>
        
        <div class="tab-div2">
            
            <div id="knifeAvail" class="tabcontent" style="display:block">
                
                <div style="text-align:center"><header>On Going Orders</header></div>
                <div class="tab-divider"></div>
                <form>
                    <table style="width:95%">
                        <tr>
                            <th style="text-align:right">Order Number</th>
                            <th style="width:3%"></th>
                            <th style="text-align:left">Customer Name</th>
                            <th style="text-align:left">Customer Phone</th>
                            <th style="text-align:left">Customer Email</th>
                            <th style="text-align:left">Order Date</th>
                            <th style="text-align:left">Order Status Name</th>
                            <th style="text-align:right">Order Total</th>
                            <th style="width:3%"></th>
                            <th style="text-align:left">PickUpDateTime</th>
                            <th style="text-align:left">OrderNote</th>
                        </tr>
                        <tr id="mTable" v-for="order in Order" :key="order.OrderID">
                            <td style="text-align:right">{{order.OrderNumber}}</td>
                            <td></td>
                            <td style="text-align:left">{{order.CustomerFirstName.concat(' '+ order.CustomerLastName)}}</td>  
                            <td style="text-align:left">{{order.CustomerPhone}}</td>
                            <td style="text-align:left">{{order.CustomerEmail}}</td>
                            <td style="text-align:left">{{order.OrderDate.slice(0,10)}}</td>
                            <td style="text-align:left">{{order.OrderStatusName}}</td>
                            <td style="text-align:right">{{order.OrderTotal.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>
                            <td></td>
                            <td style="text-align:left">{{order.PickUpDateTime.slice(0,10)}}</td>
                            <td style="text-align:left">{{order.OrderNote}}</td>
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
                Order: [],
                isShow: false,
                order: {}
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

        },
        created() {

            axios.get('http://localhost:3000/').then((res) => {
                this.Order=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

    }
</script>


