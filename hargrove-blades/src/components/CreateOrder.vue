<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Create New Order</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="customerId">Customer ID:</label><br/>
                        <input type="text" id="customerId" name="customerId" value="Test"/><br/>
                        <label for="orderNumber">Order Number:</label><br/>
                        <input type="text" id="orderNumber" name="orderNumber" value="Test"/><br/>
                        <label for="orderDate">Order Date:</label><br/>
                        <input type="date" id="orderDate" name="orderDate"/><br/>
                        <label for="billingAddress">Billing Address:</label><br/>
                        <input type="text" id="billingAddress" name="billingAddress" value="Test"/><br/>   
                        <label for="shippingAddresses">Shipping Address:</label><br/>
                        <input type="text" id="shippingAddress" name="shippingAddress" value="Test"/><br/>  
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label for="orderTotal">Order Total:</label><br/>
                        <input type="text" id="orderTotal" name="orderTotal" value="Test"/><br/>
                        <label for="payment">Payment Method:</label><br/>
                        <input type="text" id="payment" name="payment" value="Test"/><br/>
                        <label for="billingAmount">Billing Amount:</label><br/>
                        <input type="text" id="billingAmount" name="billingAmount" value="Test"/><br/>
                        <label for="balance">Balance:</label><br/>
                        <input type="text" id="balance" name="balance" value="Test"/><br/>
                        <label for="trackingNumber">Tracking Number:</label><br/>
                        <input type="text" id="trackingNumber" name="trackingNumber" value="Test"/><br/>
                        <label for="notes">Order Notes:</label><br/>
                        <textarea id="Note" rows="4" cols="24"></textarea><br /> 
                        
                    </form>
                </div>
                
                <button style="transform:translate(90%,0)">Save</button>

        </div>
    </div>
        
</div>
</template>

<script>

    export default {
        methods: {
            home() {
                this.$router.push('/customerList')
            }
        }
    }

</script>


