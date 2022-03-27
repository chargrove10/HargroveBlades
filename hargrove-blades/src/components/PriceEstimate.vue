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

            <div id="priceEstimate" class="tabcontent" style="display:block">
                
                <div style="background-color:lightgray; text-align:center"><header>Price Estimate</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="pform1">
                        <label>Knife Style</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                      
                    </div>
                    <div class="pform2">
                        <label>Steel Type</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                     
                    </div>
                    <div class="pform3">
                        <label>Handle Material</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                        <button type="submit" style="margin-left:2%">Apply Filter</button>
                    
                    </div>

                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    
                </div>

                <div class="tab-divider"></div>
                
                <div class="tab-divider"></div>

                <form>
                    <table style="width:30%">
                        <tr>
                            <th>Knife Style</th>
                            <th>Blade Finish</th>
                            <th>Handle Material</th>
                            <th>Overall Length</th>
                            <th>Blade Length</th>
                            <th>Embellishments</th>
                            <th>Customer FirstName</th>
                            <th>Customer Last Name</th>
                            <th>Customer Email</th>
                            <th>Customer Status Name</th>
                        </tr>
                        
                        <tr id="pTable" v-for="price in Price" :key="price.ProductID">
                            <td>{{price.StyleName}}</td>
                            <td>{{price.BladeFinish}}</td>
                            <td>{{price.HandleMaterial}}</td>
                            <td>{{price.OverallLength}}</td>
                            <td>{{price.BladeLength}}</td>
                            <td>{{price.Embellishments}}</td>
                            <td>{{price.CustomerFirstName}}</td>
                            <td>{{price.CustomerLastName}}</td>
                            <td>{{price.CustomerEmail}}</td>
                            <td>{{price.CustomerStatusName}}</td>

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
                Price: [],
                isShow: false,
                price: {}
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

            axios.get('http://localhost:3000/priceEstimate').then((res) => {
                this.Price=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

}
</script>


