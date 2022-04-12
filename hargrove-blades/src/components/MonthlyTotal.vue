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
                <div class="tab-divider" />
                <router-link to="/monthlyTotal" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Monthly Report</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/orderNotification" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order Notify</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2">

            <div id="monthlyOrder" class="tabcontent" style="display:block">
                <div id="myDiv"></div>
            </div>

    </div>

  </div>

</div>



</template>
     
<script  >
import axios from 'axios'
import Plotly from "plotly.js-dist";

export default {
    components: {
    // Plotly
  },
        data() {
            return {
                // noOrder_x: [0, 1, 2, 3, 4, 5],
                // noOrder_y: [1.5, 1, 1.3, 0.7, 0.8, 0.9],
                // orderTotal_x:[0, 1, 2, 3, 4, 5],
                // orderTotal_y: [1, 0.5, 0.7, 1.2, 0.3, 0.4]
                noOrder_x: [],
                noOrder_y: [],
                orderTotal_x:[],
                orderTotal_y: [],
                orderTotal_y$: []
        }},

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
        displayChart(MT_data){
            console.log(MT_data)
            MT_data.forEach((item) =>{

                this.noOrder_x.push(item.MonthYear);
                this.orderTotal_x.push(item.MonthYear);
                this.noOrder_y.push(item.NoOfOrder);
                this.orderTotal_y.push(item.MonthlyTotal.toLocaleString('en-US'))
                this.orderTotal_y$.push('$'+ item.MonthlyTotal.toLocaleString('en-US'));
            })
            var noOrder = {
            x: this.noOrder_x,
            y: this.noOrder_y,
            name: 'Number Of Order',
            yaxis: 'y2',
            type: 'scatter'
            };

            var orderTotal = {
            x: this.orderTotal_x ,
            y: this.orderTotal_y,
            name: 'Order Total',
            text: this.orderTotal_y$.map(String),
            marker: {
                color: 'rgb(49,130,189)',
                opacity: 0.7,
            },
            textposition: 'outside',
            type: 'bar',

            
            };

            var data = [noOrder, orderTotal];

            var layout = {
            title: 'Monthly Orders',
            // xaxis: {title: 'Time'},
            yaxis: {
                title: {text:'Order Total'}, 
                titlefont: {color: 'rgb(64, 98, 145)'},
                tickprefix : '$', 
                tickformat : ','
            },
            yaxis2: {
                title: 'Number Of Order',
                titlefont: {color: 'rgb(64, 98, 145)'},
                tickfont: {color: 'rgb(64, 98, 145)'},
                overlaying: 'y',
                showgrid: false,
                side: 'right',
            },
            margin: {
                t: 50,
                // pad: 4
            },
            legend: {"orientation": "h", valign: "top"}
            };
                Plotly.newPlot('myDiv', data, layout);

        }
        },
        mounted(){
     
            

      },
            
    created() {
                axios.get('http://localhost:3000/monthlyTotal').then((res) => {
                this.MonthlyTotal=res.data;
                this.displayChart(this.MonthlyTotal)
                // console.log(this.MonthlyTotal)
            }).catch(err => {
                console.log(err)
            });
        },

}
</script>