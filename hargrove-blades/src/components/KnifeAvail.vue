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
                    <table>
                        <tr>
                            <th>Order Number</th>
                            <th>Order Status</th>
                            <th>Product Status</th>
                            <th>Knife Style</th>
                            <th>Steel Used</th>
                            <th>Blade Length</th>
                            <th>Overall Length</th>
                            <th>Blade Finish</th>
                            <th>Handle Material</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>166ae4tr</td>
                            <td>Cancelled</td>
                            <td>Available</td>
                            <td>Kitchen</td>
                            <td>Steel</td>
                            <td>9</td>
                            <td>14</td>
                            <td>Polished</td>
                            <td>Redwood</td>
                            <td>$308</td>
                        </tr>
                    </table>
                </form>


            </div>

    </div>

  </div>

</div>



</template>

<script>

export default {


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

    }
</script>


