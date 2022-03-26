<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Input Customer Information</header>
    </div>

    <div class="tab-div1">
        
        <div class="tab">
        <button v-on:click=home()>Home</button>
        </div>

    </div>
      

    <div class="tab-div2" style="min-height:0">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="fname">First name:</label><br/>
                        <input type="text" id="fname" name="fname" v-model="customer.CustomerFirstName"/><br/>
                        <label for="lname">Last name:</label><br/>
                        <input type="text" id="lname" name="lname" v-model="customer.CustomerLastName"/><br/>
                        <label for="phone">Phone Number:</label><br/>
                        <input type="text" id="phone" name="phone" v-model="customer.CustomerPhone"/><br/>
                        <label for="email">Email:</label><br/>
                        <input type="text" id="email" name="email" v-model="customer.CustomerEmail"/><br/>                
                        <label for="notes">Notes:</label><br/>
                        <textarea id="Note" v-model="customer.CustomerNote" rows="4" cols="24"></textarea><br /> 
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label for="address">Street Address:</label><br/>
                        <input type="text" id="address" name="address" v-model="customer.AddressLine1"/><br/>
                        <label for="address2">Street Address 2:</label><br/>
                        <input type="text" id="address2" name="address2" v-model="customer.AddressLine2"/>
                        <label >Default Address:</label>
                        <input type="checkbox" id="default" name="default" v-model="customer.DefaultAddress"/>                                        
                        <br/>
                        <label for="City">City:</label><br/>
                        <input type="text" id="city" name="city" v-model="customer.City"/><br/>
                        <label for="State-select">State:</label><br/>
                        <select name="st" id="st" v-model="customer.StateInitials">
                            <option value="TX" > Texas </option>
                            <option value="NM"> New Mexico </option>
                        </select><br />
                        <label for="Zip">Zip Code:</label><br/>
                        <input type="text" id="zip" name="zip" v-model="customer.ZipCode"/><br/>
                        <label for="country">Country:</label><br/>
                        <input type="text" id="country" name="country" v-model="customer.Country"/><br/>
                        
                    </form>
                </div>

                <button style="transform:translate(40%,0)">Save</button>

        </div>
    </div>
</div>
</template>

<script>

    export default {
        data() {
            return {
                
                Customers: [],
                isShow: false,
                customer: {
                    CustomerFirstName: '',
                    CustomerLastName: '',
                    CustomerPhone: '',
                    CustomerEmail: '',
                    CustomerNote: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    DefaultAddress: '',
                    City: '',
                    StateInitials: '',
                    ZipCode: '',
                    Country: ''
                }
            }
        },

        created() {
            
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            handleAdd() {
                //let url = 'http://localhost:3000/customer/${this.$route.params.id}';

                
            }
        }
    }

</script>


