<template>
        <div id="Customer" class="tabcontent">
                <h style="font-weight: bold; font-size:18px">Input Customer Information</h>
                <div class="tab-divider"></div>
                <div class="tab-divider"></div>

                <div class="cform1">
                    <form>
                        <label for="fname">First name:</label><br/>
                        <input type="text" id="fname" name="fname" value="John"/><br/>
                        <label for="lname">Last name:</label><br/>
                        <input type="text" id="lname" name="lname" value="Doe"/><br/>
                        <label for="phone">Phone Number:</label><br/>
                        <input type="text" id="phone" name="phone" value="8321923443"/><br/>
                        <label for="email">Email:</label><br/>
                        <input type="text" id="email" name="email" value="something@uh.edu"/><br/>                
                        <label for="notes">Notes:</label><br/>
                        <textarea id="Note" rows="4" cols="24"></textarea><br /> 
                        
                    </form>
                </div>

                <div class="cform2">
                    <form>
                        <label for="address">Street Address:</label><br/>
                        <input type="text" id="address" name="address" value="1234 Guess ln"/><br/>
                        <label for="address2">Street Address 2:</label><br/>
                        <input type="text" id="address2" name="address2" value="Apt 1234"/>
                        <label >Default Address:</label>
                        <input type="checkbox" id="default" name="default" />                                        
                        <br/>
                        <label for="City">City:</label><br/>
                        <input type="text" id="city" name="city" value="Somewhere"/><br/>
                        <label for="State-select">State:</label><br/>
                        <select name="st" id="st">
                            <option value="TX"> Texas </option>
                            <option value="NM"> New Mexico </option>
                        </select><br />
                        <label for="Zip">Zip Code:</label><br/>
                        <input type="text" id="zip" name="zip" value="12345"/><br/>
                        <label for="country">Country:</label><br/>
                        <input type="text" id="country" name="country" value="United States"/><br/>
                        
                    </form>
                </div>

        </div>
</template>

<script>
export default ({
    data() {
        
    },

    created() {
        //get information from DB with axios here
    },

    methods: {
        //js functions go here
    }
})
</script>

<style src="../assets/style.css"></style>