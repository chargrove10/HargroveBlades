<template>
<div id = 'app'>
  <div class="main-title">
    
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        
    
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Customer</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/orderList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/productList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Product</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/bladeDetails" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Blade Details</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Reports</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2" style="min-height:auto">

            <div id="Order" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Order Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Order Number</label>
                        <input type="search" placeholder="Search" class="search-field" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    </div>
                    <div class="cform2">
                        <label>Order Date</label>
                        <input type="search" placeholder="Search" class="search-field" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    
                    </div>

                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                </div>

                
                <div class="tab-divider"></div>
                
                <form>
                    <table style="width:40%">
                        <tr style="font-size:18px">
                            <th style="font-size:18px">First Name</th>
                            <th style="font-size:18px">Last Name</th>
                            <th style="font-size:18px">Order Number</th>
                            <th style="font-size:18px">Order Date</th>
                            <th style="font-size:18px">Order Total</th>
                            <th style="font-size:18px">Balance</th>
                        </tr>
                        <tr style="font-size:18px">
                            <td style="font-size:18px">John</td>
                            <td style="font-size:18px">Doe</td>
                            <td style="font-size:18px">AE1342R</td>
                            <td style="font-size:18px">03/2022</td>
                            <td style="font-size:18px">1</td>
                            <td style="font-size:18px">$324</td>
                        </tr>
                    </table>
                </form>

                <div class="tab-divider"></div>
                <button>Edit</button>

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>



export default {


        methods: {

            product() {
                this.$router.push('/productList')
            },

            reports() {
                this.$router.push('/')
            },

            bladeDetails() {
                this.$router.push('/bladeDetails')
            },

            order() {
                this.$router.push('/orderList')
            },

            customer() {
                this.$router.push('/customerList')
            },

        }

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
