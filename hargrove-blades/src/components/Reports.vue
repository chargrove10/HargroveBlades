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

            <div id="knifeAvail" class="tabcontent">
                
                <div style="background-color:lightgray; text-align:center"><header>Available Knives</header></div>
                
                <form>
                    <table>
                        <tr>
                            <th>Order Number</th>
                            <th>Order Status</th>
                            <th>Product Status</th>
                            <th>Knife Style</th>
                            <th>Steel Used</th>
                            <th>Blade Length</th>
                            <th>Overall Length</th>
                            <th>Blade Finish</th>
                            <th>Handle Material</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>166ae4tr</td>
                            <td>Cancelled</td>
                            <td>Available</td>
                            <td>Kitchen</td>
                            <td>Steel</td>
                            <td>9</td>
                            <td>14</td>
                            <td>Polished</td>
                            <td>Redwood</td>
                            <td>$308</td>
                        </tr>
                    </table>
                </form>


            </div>

            <div id="OrderInfo" class="tabcontent">
                
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

            <div id="Newsletter" class="tabcontent">
                
                <div style="background-color:lightgray; text-align:center"><header>Newsletter</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Knife Style</label>
                        <input type="text" id="styleName" name="styleName" value="Test"/><br/>
                    </div>
                    <div class="cform2">
                        <label>Steel Description</label>
                        <input type="text" id="steelDesc" name="steelDesc" value="Test" /><br />
                    
                    </div>

                    <div class="tab-divider"></div>
                </div>

                <div class="tab-divider"></div>

                <div class="search-button">
                        <button>Search</button>
                </div>
                
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

            <div id="priceEstimate" class="tabcontent">
                
                <div style="background-color:lightgray; text-align:center"><header>Price Estimate</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="pform1">
                        <label>Knife Style</label>
                        <input type="text" id="styleName" name="styleName" value="Test"/><br/>
                    </div>
                    <div class="pform2">
                        <label>Steel Type</label>
                        <input type="text" id="steelType" name="steelType" value="Test" /><br />
                    
                    </div>
                    <div class="pform3">
                        <label>Handle Material</label>
                        <input type="text" id="handleMat" name="handleMat" value="Test" /><br />
                    
                    </div>

                    <div class="tab-divider"></div>
                </div>

                <div class="tab-divider"></div>

                <div class="search-button">
                        <button>Search</button>
                </div>
                
                <div class="tab-divider"></div>

                <form>
                    <table>
                        <tr>
                            <th>Knife Style</th>
                            <th>Steel Type</th>
                            <th>Handle Material</th>
                            <th>Embellishment</th>
                            <th>Blade Length</th>
                            <th>Blade Finish</th>
                            <th>Overall Length</th>
                            <th>Price</th>
                        </tr>
                        
                        <tr>
                            <td>Kitchen</td>
                            <td>Damascus</td>
                            <td>Redwood</td>
                            <td>Branding</td>
                            <td>8</td>
                            <td>Polished</td>
                            <td>13</td>
                            <td>350</td>
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


