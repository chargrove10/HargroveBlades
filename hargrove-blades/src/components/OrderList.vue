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

            <div class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Order Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Order Number</label>
                        <input type="search" placeholder="Search" class="search-field" />
                       
                    </div>
                    <div class="cform2">
                        <label>Order Date</label>
                        <input type="search" placeholder="Search" class="search-field" />
                         <button type="submit" style="margin-left:2%">Apply Filter</button>
                    
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
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Order Total</th>
                            <th>Balance</th>
                        </tr>
                        <tr id="oTable" v-for="orders in Orders" :key="orders.OrderID">
                            <td>{{orders.CustomerFirstName}}</td>
                            <td>{{orders.CustomerLastName}}</td>
                            <td>{{orders.OrderNumber}}</td>
                            <td>{{orders.OrderDate.slice(0,10)}}</td>
                            <td>{{orders.OrderTotal}}</td>
                            <td>{{orders.Balance}}</td>
                            <!--IS GOING TO GO TO EDIT ORDER-->
                            <td><router-link :to="{ name: 'Reports'}">Edit</router-link></td>
                            <!-- Place holder !-->
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
import axios from 'axios'


export default {
        data() {
            return {
                Orders: [],
                isShow: false,
                orders: {}
                //pass over to product detail to see if we are posting or editing
                
            }
        },

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

        },
        created() {

            axios.get('http://localhost:3000/orderList').then((res) => {
                this.Orders=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
