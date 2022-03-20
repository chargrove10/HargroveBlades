<template>
<div id = 'app'>
  <div class="main-title">
    
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        
    
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                
                <button v-on:click = customer()>Customer</button>
                <div class="tab-divider"></div>
                <button v-on:click = order()>Order</button>
                <div class="tab-divider"></div>
                <button v-on:click = product()>Product</button>
                <div class="tab-divider"></div>
                <button v-on:click= bladeDetails()>Blade Details</button>
                <div class="tab-divider" />
                <button v-on:click= reports()>Reports</button>
            </div>

        </div>

        <div class="tab-div2" style="min-height:auto">

            <div id="Customer" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Customer Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Customer Name</label>
                        <input type="search" placeholder="Search" class="search-field" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                        
                    </div>
                    <div class="cform2">
                        <label>Phone Number</label>
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
           
                <div class="table-div">
                    <form>
                        <table>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>City</th>
                                <th>State</th>
                                
                                
                            </tr>
                           
                            <tr v-for="customers in Customers" :key="customers._id">
                                <td>{{customers.CustomerFirstName}}</td>
                                <td>{{customers.CustomerLastName}}</td>
                                <td>{{customers.CustomerPhone}}</td>
                                <td>{{customers.AddressLine1}}</td>
                                <td>{{customers.StateName}}</td>
                                
                                
                            </tr>
                            
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'CustomerDetail'}"><button>Edit</button></router-link>
                    <div class="divider "></div>
                    <router-link :to="{ name: 'CustomerDetail'}"><button>Add</button></router-link>
                    <div class="divider"></div>
                    <router-link :to="{ name: 'CreateOrder'}"><button>Create Order</button></router-link>
                </div>
                

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>
import axios from "axios";

export default {

        data() {
            return {
                Customers: [],
                isShow: false,
                customers: {}
            }
        },

        created() {

            axios.get('/customerList').then((res) => {
                this.Customer=res.data;
            }).catch(err => {
                console.log(err)
            })

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

        }

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
