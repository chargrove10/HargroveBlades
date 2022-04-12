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
                <a :href="href" @click="navigate">Knife Availability</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderInfo" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Knives in Progress</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/newsletter" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Newsletter</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/priceEstimate" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Price Estimate</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderNotification" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Notify</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2">

            <div id="orderNotify" class="tabcontent" style="display:block">

                <div style="background-color:lightgray; text-align:center"><header>Orders to Send Notifications</header></div>

                <!-- <div class="tab-divider"></div> -->
                <div>

                    <!-- <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div> -->

                </div>

                <!-- <div class="tab-divider"></div> -->

                <!-- <div class="tab-divider"></div> -->
                    <table style="width:99.9%; margin-left:.05%">
                        <tr>
                            <th style="width:3%"></th>
                            <th style="text-align:left">First Name</th>
                            <th style="text-align:left">Last Name</th>
                            <th style="text-align:left">Email</th>
                            <th style="text-align:right">Order Number</th>
                            <th style="text-align:left">Order Date</th>
                            <th style="text-align:right">Order Total</th>
                            <th style="text-align:right">Balance</th>
                            <th style="width:3%"></th>
                            <th style="text-align:left">Order Status</th>
                            <th style="text-align:left">Last Status Notified</th>
                            <th style="text-align:left">Order Note</th>
                            <th style="text-align:left">Update Notification Status</th>
                            <th style="text-align:left">Send Order Notification</th>
                        </tr>
                        <tr id="oTable" v-for="orders in OrderNotify" :key="orders.OrderID">
                            <!--IS GOING TO GO SEND EMAIL NOTIFICATION-->
                            <td></td>
                            <td style="text-align:left">{{orders.CustomerFirstName}}</td>
                            <td style="text-align:left">{{orders.CustomerLastName}}</td>
                            <td style="text-align:left">{{orders.CustomerEmail}}</td>
                            <td style="text-align:right">{{orders.OrderNumber}}</td>
                            <td style="text-align:left">{{orders.OrderDate.slice(0,10)}}</td>
                            <td style="text-align:right">{{orders.OrderTotal.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>
                            <td style="text-align:right">{{orders.Balance.toLocaleString('en-US', {style:"currency", currency:"USD"})}}</td>   
                            <td></td>
                            <td style="text-align:left">{{orders.OrderStatusName}}</td>     
                            <td style="text-align:left">{{orders.LastStatusNotified}}</td>     
                            <td style="text-align:left">{{orders.OrderNote}}</td>     
                            <td hidden>{{orders.TrackingNumber}}</td>  
                            <td><button  v-on:click=updateLastNotifiedStatus(orders)>Update Notification Status</button></td>
                            <td><button  v-on:click=sendEmail(orders)>Send Order Notification</button></td>
                        </tr>
                    </table>
                    <div class="tab-divider" />
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
                selectedOrder:{},
                OrderNotify: []
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
        orderNotify() {
            this.$router.push('/orderNotify')
        },
        sendEmail(order){
            console.log(order.CustomerFirstName, order.OrderStatusName )
             var link_C = "mailto:" + order.CustomerEmail
             + "?subject=" + encodeURIComponent("Hargrove Blades - Your Order Is " + order.OrderStatusName)
             + "&body=" +  encodeURIComponent("Dear "
             + order.CustomerFirstName + " " + order.CustomerLastName + ",\nYour Order is " + order.OrderStatusName
             + ". Order number: " + order.OrderNumber + ".\n\nRegards,\nHargrove Blades");
            
            var link_Shipped = "mailto:" + order.CustomerEmail
             + "?subject=" + encodeURIComponent("Hargrove Blades - Your Order Is " + order.OrderStatusName)
             + "&body=" +  encodeURIComponent("Dear " + order.CustomerFirstName + " " + order.CustomerLastName + ",\n"+
                                                 "Your Order #" + order.OrderNumber +" is shipped with tracking number of: " 
                                                 + order.TrackingNumber + ".\n\nRegards,\nHargrove Blades");
            try{
                if(order.OrderStatusName == "Confirmed" ||order.OrderStatusName == "Cancelled"  )
                    window.location.href = link_C;
                else window.location.href = link_Shipped;
                
            } catch(e)
            {console.log(e)}
        },
        updateLastNotifiedStatus(order){
            this.selectedOrder = order
                let url = 'http://localhost:3000/LastNotifiedStatusEdit/';
                 axios.put(url, this.selectedOrder).then((response) => {
                     console.log(response)
                     this.$router.push('/orderNotification')
                 }).catch(err => {
                     console.log(err)
                 })
        }
        },
    created() {
            axios.get('http://localhost:3000/orderNotify').then((res) => {
                this.OrderNotify=res.data;
                console.log(this.OrderNotify)
            }).catch(err => {
                console.log(err)
            });
        },
}
</script>