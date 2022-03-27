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
        <div style="background-color: lightgrey" v-for="customers in Customer" :key="customers.CustomerID">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="fname">First name:</label><br/>
                        <input type="text" id="fname"  v-model="customers.CustomerFirstName"/><br/>
                        <label for="lname">Last name:</label><br/>
                        <input type="text" id="lname" v-model="customers.CustomerLastName"/><br/>
                        <label for="phone">Phone Number:</label><br/>
                        <input type="text" id="phone"  v-model="customers.CustomerPhone"/><br/>
                        <label for="email">Email:</label><br/>
                        <input type="text" id="email" name="email" v-model="customers.CustomerEmail"/><br/>                
                        <label for="notes">Notes:</label><br/>
                        <textarea id="note" v-model="customers.CustomerNote" rows="4" cols="24"></textarea><br /> 
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label for="address">Street Address:</label><br/>
                        <input type="text" id="address" name="address" v-model="customers.AddressLine1"/><br/>
                        <label for="address2">Street Address 2:</label><br/>
                        <input type="text" id="address2" name="address2" v-model="customers.AddressLine2"/>
                        <label >Default Address:</label>
                        <input type="checkbox" id="default" name="default" v-model="customers.DefaultAddress"/>                                        
                        <br/>
                        <label for="City">City:</label><br/>
                        <input type="text" id="city" name="city" v-model="customers.City"/><br/>
                        <label for="State-select">State:</label><br/>
                        <select name="st" id="st" @change="stateDetail($event)" >
                            <option selected disabled>{{customers.StateInitials}}</option>
                            <option v-for="state in State" :value="state.StateID" :key="state.StateID"  > {{state.StateInitials}} </option>
                        </select><br />
                        <label for="Zip">Zip Code:</label><br/>
                        <input type="text" id="zip" name="zip" v-model="customers.ZipCode"/><br/>
                        <label for="country">Country:</label><br/>
                        <input type="text" id="country" name="country" v-model="customers.Country"/><br/>
                        <input type="hidden" id="addID" v-model="customers.AddressID"/>
                        <input type="hidden" id="cusID" v-model="customers.CustomerID"/>
                        
                    </form>
                </div>

                <button style="transform:translate(40%,0)" v-on:click=handleEdit() >Save</button>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
    export default {

        data() {
            
            return {
                
                Customer: [],
                customers: {
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
                    Country: '',
                    AddressID: '',
                    CustomerID: ''
                },
                
                state: {},
            
            }
        },

        created() {


            let url = 'http://localhost:3000/customer';

            axios.get(url).then((response) => {
                this.State = response.data
                
            }).catch(err => {
                console.log(err)
            });

            let cid = this.$route.params.customerID;
            
            let address = this.$route.params.flag

            let url2 = 'http://localhost:3000/editCustomer/' + cid + '&' + "'"+address+"'"

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.Customer = data

             }).catch(err => {
                 console.log(err)
             })

            
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            handleEdit() {

                //sending a bit value to the stored procedure
                var flag = document.getElementById("default").checked;
                if (flag === true)
                    this.customers.DefaultAddress = 1;
                else
                    this.customers.DefaultAddress = 0;

                this.customers.CustomerFirstName = document.getElementById("fname").value
                this.customers.CustomerLastName = document.getElementById("lname").value
                this.customers.CustomerPhone = document.getElementById("phone").value
                this.customers.CustomerEmail = document.getElementById("email").value
                this.customers.CustomerNote = document.getElementById("note").value
                this.customers.AddressLine1 = document.getElementById("address").value
                this.customers.AddressLine2 = document.getElementById("address2").value
                
                this.customers.City = document.getElementById("city").value
                this.customers.ZipCode = document.getElementById("zip").value
                this.customers.Country = document.getElementById("country").value
                this.customers.AddressID = document.getElementById("addID").value
                this.customers.CustomerID = document.getElementById("cusID").value                 

                 let url = 'http://localhost:3000/editCustomer/';

                 axios.put(url, this.customers).then((response) => {
                     console.log(response)
                     this.$router.push('/customerList')
                 }).catch(err => {
                     console.log(err)
                 })

                
            },

            stateDetail(event) {
                //handle event to grab data from the dropdown and use a lookup value to send
                //this is assigning the StateID value from dropdown to the customer.StateID object
                this.customers.StateID = event.target.value
                console.log(this.customers.StateID)
                
            }
        }
    }
    

</script>


