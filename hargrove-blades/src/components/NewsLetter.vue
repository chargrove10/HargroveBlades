<template>
<div>
    <div class="main-title">
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

            <div id="Newsletter" class="tabcontent" style="display:block">
                
                <div style="background-color:lightgray; text-align:center"><header>Newsletter</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Knife Style</label>
                        <input type="search" placeholder="Search" class="search-field" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    </div>
                    <div class="cform2">
                        <label>Steel Description</label>
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

                
                
                <div class="tab-divider"></div>
                
                <form>
                    <table>
                        <tr>
                            <th>Customer First Name</th>
                            <th>Customer Last Name</th>
                            <th>Customer Email</th>
                            <th>Knife Style</th>
                            <th>Steel Type</th>

                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>something@gmail.com</td>
                            <td>Butcher's Knife</td>
                            <td>Random Type</td>
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


