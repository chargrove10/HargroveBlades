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
                <a :href="href" @click="navigate">Availability</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderInfo" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Info</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/newsletter" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Newsletter</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/priceEstimate" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Price Estimate</a>
                </router-link>
                
            </div>

        </div>

        <div class="tab-div2">

            <div id="knifeAvail" class="tabcontent" style="display:block">
                
                <div style="background-color:lightgray; text-align:center"><header>Available Knives</header></div>
                
                <form>
                    <table style="width:40%">
                        <tr>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Customer Phone</th>
                            <th>Customer Email</th>
                            <th>Order Date</th>
                            <th>Order Status Name</th>
                            <th>Order Total</th>
                            <th>PickUpDateTime</th>
                            <th>OrderNote</th>
                        </tr>
                        <tr id="mTable" v-for="order in Order" :key="order.OrderID">
                            <td>{{order.OrderNumber}}</td>
                            <td>{{order.CustomerFirstName}}</td>  
                            <td>{{order.CustomerPhone}}</td>
                            <td>{{order.CustomerEmail}}</td>
                            <td>{{order.OrderDate.slice(0,10)}}</td>
                            <td>{{order.OrderStatusName}}</td>
                            <td>{{order.OrderTotal}}</td>
                            <td>{{order.PickUpDateTime.slice(0,10)}}</td>
                            <td>{{order.OrderNote}}</td>
                        </tr>
                    </table>
                </form>


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


