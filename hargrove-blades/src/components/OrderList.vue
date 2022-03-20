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

            <div id="Order" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Order Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Order Number</label>
                        <input type="text" id="orderNum" name="OrderNum" value="AE12321T"/><br/>
                    </div>
                    <div class="cform2">
                        <label>Order Date</label>
                        <input type="text" id="date" name="date" value="03/2022" /><br />
                    
                    </div>

                    <div class="tab-divider"></div>
                </div>

                <div class="search-button">
                        <button>Search</button>
                </div>
                
                <div class="tab-divider"></div>
                
                <form>
                    <table>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Order Total</th>
                            <th>Balance</th>
                        </tr>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>AE1342R</td>
                            <td>03/2022</td>
                            <td>1</td>
                            <td>$324</td>
                        </tr>
                    </table>
                </form>

                <div class="tab-divider"></div>
                <button>Edit</button>

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>



export default {


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
