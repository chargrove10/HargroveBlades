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
                        <select name="st" id="st" @change="stateDetail($event)" v-model="customer.StateInitials">
                            <option v-for="state in State" :value="state.StateID" :key="state.StateID" > {{state.StateInitials}} </option>
                        </select><br />
                        <label for="Zip">Zip Code:</label><br/>
                        <input type="text" id="zip" name="zip" v-model="customer.ZipCode"/><br/>
                        <label for="country">Country:</label><br/>
                        <input type="text" id="country" name="country" v-model="customer.Country"/><br/>
                        
                    </form>
                </div>

                <button style="transform:translate(40%,0)" v-on:click=handleAdd()>Save</button>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
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
                    //Assigned through the onchange event
                    StateID: '',
                    ZipCode: '',
                    Country: ''
                },
                State: [],
                state: {
                    StateID: '',
                    StateInitials: ''
                }
            }
        },

        created() {
            let url = 'http://localhost:3000/customer';

            axios.get(url).then((response) => {
                this.State = response.data
                console.log(this.State)
            }).catch(err => {
                console.log(err)
            });
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            handleAdd() {

                let url = 'http://localhost:3000/customer';

                var vm = this;

                 axios.post(url, vm.customer).then(() => {
                     this.$router.push('/customerList')
                      this.customer = {
                          //assigning all values as empty
                          CustomerFirstName: '',
                          CustomerLastName: '',
                          CustomerPhone: '',
                          CustomerEmail: '',
                          CustomerNote: '',
                          AddressLine1: '',
                          AddressLine2: '',
                          DefaultAddress: '',
                          City: '',
                          StateID: '',
                          ZipCode: '',
                          Country: ''
                      }
                 }).catch(err => {
                     console.log(err)
                 });

                
            },

            stateDetail(event) {
                //handle event to grab data from the dropdown and use a lookup value to send
                //this is assigning the StateID value from dropdown to the customer.StateID object
                this.customer.StateID = event.target.value
                console.log(this.customer.StateID)
            }
        }
    }

</script>


