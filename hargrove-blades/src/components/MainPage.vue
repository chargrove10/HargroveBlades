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

            <div id="Customer" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Customer Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Customer Last Name</label>
                        <input type="search" v-model="nameValue" placeholder="Name" class="search-field" />
                    </div>
                    <div class="cform2">
                        <label>Phone Number</label>
                        <input type="search" v-model="phoneValue" placeholder="Phone Number" class="search-field" />
                        <button @click="applyFilter($event)" type="submit" style="margin-left:2%">Apply Filter</button>
                    
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
                this.Customers=res.data;
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

            async applyFilter() {
                const name = this.customerName;
                const phone = this.customerPhone;

                await this.$axios.get('/customerList', {
                    params: {
                        name,
                        phone
                    }
                }).then(function (response) {
                    this.Customers=response.data
                })
            }

        },

        computed: {
            customerName: {
                get() {
                    if (!this.value) return null;
                    return this.value.nameValue;
                },
                set(value) {
                    const payload = this.value;
                    this.$emit('input', {...payload, nameValue: value})
                }
            },
            customerPhone: {
                get() {
                    if (!this.value) return null;
                    return this.value.phoneValue;
                },
                set(value) {
                    const payload = this.value;
                    this.$emit('input', {...payload, phoneValue: value})
                }
            },
        }

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
