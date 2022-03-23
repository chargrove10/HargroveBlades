<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Input Customer Information</header>
    </div>

    <div class="tab-div1">
        
        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>

    </div>
      

    <div class="tab-div2" style="min-height:0">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0)">
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

                <div style="width:40%; margin-left: 60%">
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


