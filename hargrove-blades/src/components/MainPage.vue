<template>
  <div class="main-title">
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                
                <button v-on:click ="openCustomer(event, 'Customer')">Customer</button>
                <div class="tab-divider"></div>
                <button v-on:click ="openOrder(event, 'Order')">Order</button>
                <div class="tab-divider"></div>
                <button v-on:click ="openProduct(event, 'Product')">Product</button>
            </div>

        </div>

        <div class="tab-div2">

            <div id="Order" class="tabcontent">
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
                    <div>
                        <button>Search</button>
                    </div>
                    <div class="tab-divider"></div>
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

            <div id="Customer" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Customer Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Customer Name</label>
                        <input type="text" id="fname" name="fname" value="John"/><br/>
                    </div>
                    <div class="cform2">
                        <label>Phone Number</label>
                        <input type="text" id="phone" name="phone" value="1233334565" /><br />
                    
                    </div>
                    <div>
                        <button>Search</button>
                    </div>
                    <div class="tab-divider"></div>
                </div>
                <div class="tab-divider"></div>
           
                <div>
                    <form>
                        <table>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>City</th>
                                <th>State</th>
                                
                                
                            </tr>
                           
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>1234454321</td>
                                <td>Sugar Grove</td>
                                <td>Texas</td>
                                
                                
                            </tr>
                            
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <button >Edit</button>
                    <div class="divider "></div>
                    <router-link to="/customer"><button>Add</button></router-link>
                    <div class="divider"></div>
                    <button >Create Order</button>
                </div>

            </div>

            <div id="Product" class="tabcontent">
                <div style="background-color:lightgray; text-align:center"><header>Product Information</header></div>
                <div class="tab-divider"></div>
                <div>
                    <div class="pform1">
                        <label>Serial Number</label>
                        <input type="text" id="serial" name="serial" value="1234era54t"/><br/>
                    </div>
                    <div class="pform2">
                        <label>Knife Style</label>
                        <input type="text" id="kstyle" name="kstyle" value="Curved" /><br/>               
                    </div>
                    <div class="pform3">
                        <label>Steel Type</label>
                        <input type="text" id="stype" name="stype" value="Damascus" /><br/>
                    </div>
                    <div>
                        <button>Search</button>
                    </div>
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
                    <button >Edit</button>
                    <div class="divider "></div>
                    <button >Add</button>
                </div>
            </div>
        
        </div>
        
    </div>
</template>

<script>
export default {

        methods: {

            createCustomer() {
                this.$router.push('/customer')
            },

            openOrder(event, Order) {
        var i, tabcontent, tablink;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablink = document.getElementsByClassName("tablink");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("active", "");
        }

        document.getElementById(Order).style.display = "block";
        event.currentTarget.className += "active";
            },

            openCustomer(event, Customer) {
        var i, tabcontent, tablink;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablink = document.getElementsByClassName("tablink");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("active", "");
        }

        document.getElementById(Customer).style.display = "block";
        event.currentTarget.className += "active";
            },

        openProduct(event, Product) {
        var i, tabcontent, tablink;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablink = document.getElementsByClassName("tablink");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("active", "");
        }

        document.getElementById(Product).style.display = "block";
        event.currentTarget.className += "active";
            }

        },

  name: 'MainPage',
  props: {
    msg: String
  }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
