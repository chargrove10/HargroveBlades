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
                <router-link to="/orderNotification" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Notify</a>
                </router-link>
                
            </div>

        </div>

        <div class="tab-div2">

            <div class="tabcontent" style="display:block">
                
                <div style="text-align:center"><header>Available Knives</header></div>
                <div class="tab-divider"></div>
                <form>
                    <table style="width:95%; margin-left:2.5%">
                        <tr>
                            <th style="width:3%"> </th>
                            <th style="text-align:left">SerialNo</th>
                            <th style="text-align:left">Style Name</th>
                            <th style="text-align:left">Steel Name</th>
                            <th style="width:4%"> </th>                            
                            <th style="text-align:right; width:10%">Overall Length (in)</th>
                            <th style="text-align:right">Blade Length (in)</th>
                            <th style="width:3%"> </th>
                            <th style="text-align:left">Handle Material</th>
                            <th style="text-align:left">Embellishments</th>                            
                            <th style="width:3%"> </th>
                            <th style="text-align:right">Price ($)</th>
                            <th style="width:3%"> </th>
                            
                        </tr>
                        <tr id = "aTable" v-for="knifeAvailable in KnifeAvail" :key="knifeAvailable.ProductID">
                            <td></td>
                            <td style="text-align:left">{{knifeAvailable.SerialNo}}</td>
                            <td style="text-align:left">{{knifeAvailable.StyleName}}</td>
                            <td style="text-align:left">{{knifeAvailable.SteelName}}</td>  
                            <td style="width:4%"> </td>                         
                            <td style="text-align:right; width:10%">{{knifeAvailable.overalllength}}</td>        
                            <td style="text-align:right">{{knifeAvailable.bladelength}}</td>
                            <td></td>
                            <td style="text-align:left">{{knifeAvailable.handlematerial}}</td>
                            <td style="text-align:left">{{knifeAvailable.embellishments}}</td>                        
                            <td style="width:3%"> </td>
                            <td style="text-align:right">{{knifeAvailable.Price.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>
                            <td></td>
                            
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
                KnifeAvail: [],
                isShow: false,
                knifeAvailable: {}
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

            axios.get('http://localhost:3000/knifeAvailability').then((res) => {
                this.KnifeAvail=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

    }
</script>


