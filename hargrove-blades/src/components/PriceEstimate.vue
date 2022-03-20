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
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    </div>
                    <div class="pform2">
                        <label>Steel Type</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    
                    </div>
                    <div class="pform3">
                        <label>Handle Material</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    
                    </div>

                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    
                </div>

                <div class="tab-divider"></div>
                
                <div class="tab-divider"></div>

                <form>
                    <table>
                        <tr>
                            <th>Knife Style</th>
                            <th>Steel Type</th>
                            <th>Handle Material</th>
                            <th>Embellishment</th>
                            <th>Blade Length</th>
                            <th>Blade Finish</th>
                            <th>Overall Length</th>
                            <th>Price</th>
                        </tr>
                        
                        <tr>
                            <td>Kitchen</td>
                            <td>Damascus</td>
                            <td>Redwood</td>
                            <td>Branding</td>
                            <td>8</td>
                            <td>Polished</td>
                            <td>13</td>
                            <td>350</td>
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


