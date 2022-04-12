<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>View Customer Purchase History</header>
    </div>

   <div class="tab-div1">

        <div class="tab">
                
            <router-link to="/customerList" custom v-slot="{navigate, href}">
            <a :href="href" @click="navigate">Home</a>
            </router-link>
                
        </div>

    </div>
      
    <div id="address-div" style="background-color:white; width:87.35% ;transform:translatex(3%); border:thin solid black; height:auto"  class="tab-div2">
        <form>
                    <table style="transform:translate(-2%,0); width:100%">
                        
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Last Status Notified</th>
                            <th>Order Note</th>
                            <th>Order Total</th>
                            <th>Balance</th>
                      
                            
                        </tr>
                        <tr id="oTable" v-for="order in CustomerHist" :value="order.OrderID" :key="order.OrderID">
                            <td>{{order.CustomerFirstName}}</td>
                            <td>{{order.CustomerLastName}}</td>
                            <td>{{order.OrderNumber}}</td>
                            <td>{{order.OrderDate.slice(0,10)}}</td>
                            <td>{{order.OrderStatusName}}</td>
                            <td>{{order.LastOrderStatusNotified}}</td>
                            <td>{{order.OrderNote}}</td>
                            <td>${{order.OrderTotal.toLocaleString('EN-US')}}</td>
                            <td>${{order.Balance.toLocaleString('EN-US')}}</td>
                        </tr>
                    </table>
        </form>

    </div>
    

</div>
</template>

<script>
import axios from 'axios'
    export default {

        data() {
            
            return {
            CustomerHist: []
            }
        },

        created() {
            let cid = this.$route.params.customerID;
            console.log(cid)
            let url = 'http://localhost:3000/customerHist/'+ cid;

            axios.get(url).then((response) => {
                this.CustomerHist = response.data
                
            }).catch(err => {
                console.log(err)
            });
            
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },
        }
    }
    

</script>