<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Input Customer Information</header>
    </div>

   <div class="tab-div1">

        <div class="tab">
                
            <router-link to="/customerList" custom v-slot="{navigate, href}">
            <a :href="href" @click="navigate">Home</a>
            </router-link>
                
        </div>

    </div>
      

    <div class="tab-div2" style="min-height:0">
        <div style="background-color: lightgrey" v-for="customers in Customer" :key="customers.CustomerID">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="address">Street Address:</label><br/>
                        <input type="text" id="address" name="address" v-model="address.AddressLine1"/><br/>
                        <label for="address2">Street Address 2:</label><br/>
                        <input type="text" id="address2" name="address2" v-model="address.AddressLine2"/>
                        <label >Default Address:</label>
                        <input type="checkbox" id="default" name="default" v-model="address.DefaultAddress"/>                                        
                        <br/> 
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        
                        <label for="City">City:</label><br/>
                        <input type="text" id="city" name="city" v-model="address.City"/><br/>
                        <label for="State-select">State:</label><br/>
                        <select name="st" id="st" @change="stateDetail($event)" >
                            <option selected disabled>{{address.StateInitials}}</option>
                            <option v-for="state in State" :value="state.StateID" :key="state.StateID"  > {{state.StateInitials}} </option>
                        </select><br />
                        <label for="Zip">Zip Code:</label><br/>
                        <input type="text" id="zip" name="zip" v-model="address.ZipCode"/><br/>
                        <label for="country">Country:</label><br/>
                        <input type="text" id="country" name="country" v-model="address.Country"/><br/>
                        <input type="hidden" id="addID" v-model="address.AddressID"/>
                        <input type="hidden" id="cusID" v-model="address.CustomerID"/>
                        
                    </form>
                </div>

                <button style="transform:translate(90%,0)" v-on:click="handleAdd()" >Save</button>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
    export default {

        data() {
            
            return {
                
                Address: [],
                address: {
                    AddressLine1: '',
                    AddressLine2: '',
                    DefaultAddress: '',
                    City: '',
                    StateID: '',
                    ZipCode: '',
                    Country: '',
                    AddressID: '',
                    CustomerID: ''
                },
                State: [],
                state: {},
            
            }
        },

        created() {

            //Getting the State information for dropdown
            let url = 'http://localhost:3000/customer';

            axios.get(url).then((response) => {
                this.State = response.data
                
            }).catch(err => {
                console.log(err)
            });
  
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            handleAdd() {

                this.address.AddressLine1 = document.getElementById("address").value
                this.address.AddressLine2 = document.getElementById("address2").value
                this.address.DefaultAddress = document.getElementById("default").checked
                this.address.City = document.getElementById("city").value
                this.address.ZipCode = document.getElementById("zip").value
                this.address.Country = document.getElementById("country").value
                this.address.AddressID = document.getElementById("addID").value
                this.address.CustomerID = document.getElementById("cusID").value   
                
                console.log(this.address)

                //change to add an address
                  let url = 'http://localhost:3000/addAddress/';

                 axios.post(url, this.address).then((response) => {
                     console.log(response)
                     this.$router.push('/customerList')
                 }).catch(err => {
                     console.log(err)
                 })

                
            },

            stateDetail(event) {
                //handle event to grab data from the dropdown and use a lookup value to send
                //this is assigning the StateID value from dropdown to the customer.StateID object
                this.address.StateID = event.target.value
                console.log(this.address.StateID)
                
                
            }
        }
    }
    

</script>


