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
                
            </div>

        </div>

        <div class="tab-div2">

            <div class="tabcontent" style="display:block">
                
                <div style="text-align:center"><header>Newsletter</header></div>
                
                <div class="tab-divider"></div>
                

                <div class="tab-divider"></div>
                
                <div class="tab-divider"></div>

                <form>
                    <table style="width:95%; margin-left:3%">
                        <tr>
                            <th style="width:3%"> </th>
                            <th style="text-align:left">Knife Style</th>
                            <th style="text-align:left">Blade Finish</th>
                            <th style="text-align:left">Handle Material</th>
                            <th style="width:3%"> </th>
                            <th style="text-align:right">Overall Length</th>
                            <th style="text-align:right">Blade Length</th>
                            <th style="width:3%"> </th>
                            <th style="text-align:left">Embellishments</th>
                            <th style="width:1%"> </th>
                            <th style="text-align:left">Customer FirstName</th>
                            <th style="width:1%"> </th>
                            <th style="text-align:left">Customer Last Name</th>
                            <th style="width:1%"> </th>
                            <th style="text-align:left">Customer Email</th>
                            <th>Customer Status Name</th>
                        </tr>
                        
                        <tr id="pTable" v-for="news in News" :key="news.ProductID">
                            <td></td>
                            <td style="text-align:left">{{news.StyleName}}</td>
                            <td style="text-align:left">{{news.BladeFinish}}</td>
                            <td style="text-align:left">{{news.HandleMaterial}}</td>
                            <td style="width:3%"> </td>
                            <td style="text-align:right">{{news.OverallLength.toFixed(2)}}</td>
                            <td style="text-align:right">{{news.BladeLength.toFixed(2)}}</td>
                            <td></td>
                            <td style="text-align:left">{{news.Embellishments}}</td>
                            <td style="width:1%"> </td>
                            <td style="text-align:left">{{news.CustomerFirstName}}</td>
                            <td style="width:1%"> </td>
                            <td style="text-align:left">{{news.CustomerLastName}}</td>
                            <td style="width:1%"> </td>
                            <td style="text-align:left">{{news.CustomerEmail}}</td>
                            <td>{{news.CustomerStatusName}}</td>

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
                News: [],
                isShow: false,
                news: {}
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

            axios.get('http://localhost:3000/newsletter').then((res) => {
                this.News=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

}
</script>


