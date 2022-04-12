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
                            <th style="text-align:right">Knife Style</th>
                            <th style="text-align:right">Blade Finish</th>
                            <th style="text-align:right">Handle Material</th>
                            <th style="width:3%"> </th>
                            <th style="text-align:left">Overall Length</th>
                            <th style="text-align:left">Blade Length</th>
                            <th style="text-align:right">Embellishments</th>
                            <th style="width:1%"> </th>
                            <th style="text-align:right">Customer FirstName</th>
                            <th style="width:1%"> </th>
                            <th style="text-align:right">Customer Last Name</th>
                            <th style="width:1%"> </th>
                            <th style="text-align:right">Customer Email</th>
                            <th>Customer Status Name</th>
                        </tr>
                        
                        <tr id="pTable" v-for="news in News" :key="news.ProductID">
                            <td style="text-align:right">{{news.StyleName}}</td>
                            <td style="text-align:right">{{news.BladeFinish}}</td>
                            <td style="text-align:right">{{news.HandleMaterial}}</td>
                            <td style="width:3%"> </td>
                            <td style="text-align:left">{{news.OverallLength}}</td>
                            <td style="text-align:left">{{news.BladeLength}}</td>
                            <td style="text-align:right">{{news.Embellishments}}</td>
                            <td style="width:1%"> </td>
                            <td style="text-align:right">{{news.CustomerFirstName}}</td>
                            <td style="width:1%"> </td>
                            <td style="text-align:right">{{news.CustomerLastName}}</td>
                            <td style="width:1%"> </td>
                            <td style="text-align:right">{{news.CustomerEmail}}</td>
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


