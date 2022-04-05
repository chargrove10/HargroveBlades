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
                        <label for="status">Customer Status</label><br/>
                        <select @change="statusChange($event)">
                            <option hidden disabled selected v-for="cusStatus in CusStatus" :value="cusStatus.CustomerStatusID" :key="cusStatus.CustomerStatusID"> {{cusStatus.CustomerStatusName}} </option>
                            <option v-for="status in Status" :value="status.CustomerStatusID" :key="status.CustomerStatusID">{{status.CustomerStatusName}}</option>
                        </select>
                        <input type="hidden" id="addID" v-model="customers.AddressID"/>
                        <input type="hidden" id="cusID" v-model="customers.CustomerID"/>
                        
                    </form>
                </div>

                <router-link :to="{ name: 'AddAddress', params: {customerID: customers.CustomerID}}"><button style="transform:translate(60%,0)">Add Address</button></router-link>
                <button style="transform:translate(130%,0)" v-on:click="handleEdit()" >Save</button>

        </div>
    </div>

    <div style="background-color:white;">
        <form>
                    <table style="transform:translate(-8.5%,0); width:87.5%">
                        
                        <tr>
                            <th>Default Address</th>
                            <th>Address Line 1</th>
                            <th>Address Line 2</th>
                            <th>City</th>
                            <th>Zipcode</th>
                            <th>State Initials</th>
                            <th>Country</th>
                            
                            
                        </tr>
                        <tr id="oTable" v-for="address in Address" :value="address.AddressID" :key="address.AddressID">
                            <td>{{address.DefaultAddress}}</td>
                            <td>{{address.AddressLine1}}</td>
                            <td>{{address.AddressLine2}}</td>
                            <td>{{address.City}}</td>
                            <td>{{address.ZipCode}}</td>
                            <td>{{address.StateInitials}}</td>
                            <td>{{address.Country}}</td>
                            
                            
                            <td><button type="button">Edit</button></td>

                        </tr>
                    </table>
        </form>

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
                    CustomerID: '',
                    CustomerStatusID: ''
                },
                State: [],
                state: {},
                Status: [],
                status: {},
                CusStatus: [],
                cusStatus: {},
                Address: [],
                address: {}
            
            }
        },

        created() {


            let url = 'http://localhost:3000/customer';

            axios.get(url).then((response) => {
                this.State = response.data
                
            }).catch(err => {
                console.log(err)
            });

            let statusURL = 'http://localhost:3000/cStatus';

            axios.get(statusURL).then((response) => {
                this.Status = response.data
            }).catch(err => {
                console.log(err)
            })

            let cid = this.$route.params.customerID;
            
            let address = this.$route.params.flag

            let url2 = 'http://localhost:3000/editCustomer/' + cid + '&' + "'"+address+"'"

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.Customer = data

             }).catch(err => {
                 console.log(err)
             });

             let statusURL2 = 'http://localhost:3000/customerStatus/' + cid

             console.log(cid)

             axios.get(statusURL2).then((res) => {
                 const status = res.data
                 this.CusStatus = status
             }).catch(err => {
                 console.log(err)
             })

             let addressURL = 'http://localhost:3000/getAddress/' + cid
             axios.get(addressURL).then((res) => {
                 const add = res.data
                 this.Address = add
             }).catch(err => {
                 console.log(err)
             })

            
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            handleEdit() {

                this.customers.CustomerFirstName = document.getElementById("fname").value
                this.customers.CustomerLastName = document.getElementById("lname").value
                this.customers.CustomerPhone = document.getElementById("phone").value
                this.customers.CustomerEmail = document.getElementById("email").value
                this.customers.CustomerNote = document.getElementById("note").value
                this.customers.AddressLine1 = document.getElementById("address").value
                this.customers.AddressLine2 = document.getElementById("address2").value
                this.customers.DefaultAddress = document.getElementById("default").checked
                this.customers.City = document.getElementById("city").value
                this.customers.ZipCode = document.getElementById("zip").value
                this.customers.Country = document.getElementById("country").value
                this.customers.AddressID = document.getElementById("addID").value
                this.customers.CustomerID = document.getElementById("cusID").value   
                
                console.log(this.customers)

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
                
            },

            statusChange(event) {
                this.customers.CustomerStatusID = event.target.value
                console.log(this.customers.CustomerStatusID)
            }
        }
    }
    

</script>


