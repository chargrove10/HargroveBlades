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
                <div style="text-align:center"><header>Order Line Status Information</header></div>
                
                <div class="tab-divider"></div>
           
                <div class="table-div">
                    <form>
                        <table>
                            <tr>
                                <th>Order Line Status Name</th>
                                <th>Description</th>
                                <th>Active</th>
                                <th></th>
                                
                            </tr>
                           
                            <tr id = "cTable" v-for="orderLineStatus in OrderLineStatus" :key="orderLineStatus.OrderLineStatusID">
                                <td>{{orderLineStatus.OrderLineStatusName}}</td>
                                <td>{{orderLineStatus.OrderLineStatusDesc}}</td>
                                <td>{{orderLineStatus.OrderLineStatusActive}}</td>
                                <td><router-link :to="{ name: 'EditOrderLineStatus', params: {orderLineStatID: orderLineStatus.OrderLineStatusID}}">Edit</router-link></td>
                                
                            </tr>
                            
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'CreateOrderLineStatus'}"><button>Create Status</button></router-link>
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
                OrderLineStatus: [],
                isShow: false,
                orderLineStatus: {
                    OrderLineStatusID: '',
                    OrderLineStatusName: '',
                    OrderLineStatusDesc: '',
                    OrderLineStatusActive: ''
                }
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

            axios.get('http://localhost:3000/orderLinestatus').then((res) => {
                this.OrderLineStatus=res.data;
                console.log(this.OrderLineStatus)
            }).catch(err => {
                console.log(err)
            });

        },

}
</script>


