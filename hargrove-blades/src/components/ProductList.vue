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

            <div id="Product" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Product Information</header></div>
                <div class="tab-divider"></div>
                <div>
                    <div class="pform1">
                        <label>Serial Number</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    </div>
                    <div class="pform2">
                        <label>Knife Style</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>               
                    </div>
                    <div class="pform3">
                        <label>Steel Type</label>
                        <input type="search" placeholder="Search" class="search-field" style="width:40%" />
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
           
                <div>
                    <form>
                        <table>
                            <tr>
                                <th>Serial Number</th>
                                <th>Product Status</th>
                                <th>Knife Style</th>
                                <th>Steel Type</th>
                                <th>Handle Material</th>
                                <th>Blade Length</th>
                                <th>Overall Length</th>
                                <th>Embellishments</th>
                            </tr>
                            <tr>
                                <td>AE12344e</td>
                                <td>Pending</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'ProductDetail'}"><button>Edit</button></router-link>
                    <div class="divider "></div>
                    <router-link :to="{ name: 'ProductDetail'}"><button>Add</button></router-link>
                </div>
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
