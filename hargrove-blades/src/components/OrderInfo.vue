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

            <div class="tabcontent" style="display:block">
                
                <div style="background-color:lightgray; text-align:center"><header>Order Information</header></div>
                <div class="tab-divider"></div>
                <form>
                    <table style="width:95%; margin-left:2.5%">
                        <tr>
                            <th>SerialNo</th>
                            <th>Style Name</th>
                            <th>Steel Name</th>
                            <th>Overall Length</th>
                            <th>Blade Length</th>
                            <th>Handle Material</th>
                            <th>Embellishments</th>
                            <th>Product Note</th>
                            <th>Price</th>
                            <th>Product Status Name</th>
                        </tr>
                        <tr id = "orTable" v-for="orderInfos in OrderInfo" :key="orderInfos.ProductID">
                            <td>{{orderInfos.SerialNo}}</td>
                            <td>{{orderInfos.StyleName}}</td>
                            <td>{{orderInfos.SteelName}}</td>
                            <td>{{orderInfos.overalllength}}</td>
                            <td>{{orderInfos.bladelength}}</td>
                            <td>{{orderInfos.handlematerial}}</td>
                            <td>{{orderInfos.embellishments}}</td>
                            <td>{{orderInfos.productnote}}</td>
                            <td>{{orderInfos.Price}}</td>
                            <td>{{orderInfos.ProductStatusName}}</td>
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
                OrderInfo: [],
                isShow: false,
                orderInfos: {}
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
        }

        },
        created() {

            axios.get('http://localhost:3000/orderInfo').then((res) => {
                this.OrderInfo=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

    }
</script>


