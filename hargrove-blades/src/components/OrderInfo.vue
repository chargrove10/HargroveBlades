<template>
<div>
    <div class="main-title">
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        <h1 class="title">Hargrove-Blades Reports</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab" style="transform: translate(20%, 10%)">
                
                <button v-on:click = home()>Home</button>
                <div class="tab-divider" />
                <button v-on:click = knifeAvail()>Availability</button>
                <div class="tab-divider" />
                <button v-on:click = orderInfo()>Order Info</button>
                <div class="tab-divider" />
                <button v-on:click = newsletter()>Newsletter</button>
                <div class="tab-divider" />
                <button v-on:click = priceEstimate()>Price Estimate</button>
                
            </div>

        </div>

        <div class="tab-div2">

            <div id="OrderInfo" class="tabcontent" style="display:block">
                
                <div style="background-color:lightgray; text-align:center"><header>Order Information</header></div>
                
                <form>
                    <table>
                        <tr>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Product Status</th>
                            <th>Complete Date</th>
                            
                        </tr>
                        <tr>
                            <td>166ae4tr</td>
                            <td>03/2022</td>
                            <td>In Progress</td>
                            <td>Pending</td>
                            <td>null</td>
                            
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


