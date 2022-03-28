<template>
<div>
    <div class="main-title">
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        <h1 class="title">Hargrove-Blades Status</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/status" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Customer Status</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderStatus" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Status</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/productStatus" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Product Status</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderLineStatus" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Line Status</a>
                </router-link>
                
            </div>

        </div>

         <div class="tab-div2" style="min-height:auto">

            <div class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Customer Status Information</header></div>
                
                <div class="tab-divider"></div>
           
                <div class="table-div">
                    <form>
                        <table>
                            <tr>
                                <th>Customer Status Name</th>
                                <th>Description</th>
                                
                                
                            </tr>
                           
                            <tr id = "cTable" v-for="customerStatus in CustomerStatus" :key="customerStatus.CustomerStatusID">
                                <td>{{customerStatus.CustomerStatusName}}</td>
                                <td>{{customerStatus.CustomerStatusDesc}}</td>
                                
                            </tr>
                            
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'CreateCustomerStatus'}"><button>Create Status</button></router-link>
                </div>
                
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
                CustomerStatus: [],
                isShow: false,
                customerStatus: {}
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
            },

        },
        created() {

            axios.get('http://localhost:3000/status').then((res) => {
                this.CustomerStatus=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

}
</script>


