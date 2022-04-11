<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px; color:white">
        <header>Edit Customer Information</header>
    </div>

   <div class="tab-div1">

        <div class="tab">
                
            <router-link to="/customerList" custom v-slot="{navigate, href}">
            <a :href="href" @click="navigate">Home</a>
            </router-link>
                
        </div>

    </div>
      

    <div id="tab-div2" class="tab-div2" style="min-height:0;width:87.35% ;transform:translatex(3%)">
        <div style="border:thin solid black" v-for="customers in Customer" :key="customers.CustomerID">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="fname">First name:</label><br/>
                        <input type="text" id="fname" maxlength="30" required @change="fnameCheck($event)" v-model="customers.CustomerFirstName"/><br/>
                        <label for="lname">Last name:</label><br/>
                        <input type="text" id="lname" maxlength="30" required @change="lnameCheck($event)" v-model="customers.CustomerLastName"/><br/>
                        <label for="phone">Phone Number:</label><br/>
                        <input type="text" id="phone" maxlength="12" required @change="phonecheck($event)" v-model="customers.CustomerPhone"/><br/>
                         
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        
                        <label for="email">Email:</label><br/>
                        <input type="text" id="email" name="email" maxlength="50" @change="emailcheck($event)" v-model="customers.CustomerEmail"/><br/>                
                        <label for="notes">Notes:</label><br/>
                        <textarea id="note" v-model="customers.CustomerNote" rows="4" cols="24"></textarea><br />
                        <label for="status">Customer Status</label><br/>
                        <select id="status" @change="statusChange($event)">
                            <option hidden disabled selected v-for="cusStatus in CusStatus" :value="cusStatus.CustomerStatusID" :key="cusStatus.CustomerStatusID"> {{cusStatus.CustomerStatusName}} </option>
                            <option v-for="status in Status" :value="status.CustomerStatusID" :key="status.CustomerStatusID">{{status.CustomerStatusName}}</option>
                        </select>
                        <input type="hidden" id="cusID" v-model="customers.CustomerID"/>
                        
                    </form>
                </div>

                <router-link :to="{ name: 'AddAddress', params: {customerID: customers.CustomerID}}"><button style="transform:translate(60%,0)">Add Address</button></router-link>
                <button style="transform:translate(150%,0)" v-on:click="handleEdit()" >Save</button>

        </div>
    </div>

    <div id="address-div" style="background-color:white"  class="tab-div2">
        <form>
                    <table style="transform:translate(.9%,0); width:97.11%; font-style:oblique; font-family:'Global Sans Serif';">
                        
                        <tr>
                            <th>Default Address</th>
                            <th>Address Line 1</th>
                            <th>Address Line 2</th>
                            <th>City</th>
                            <th>Zipcode</th>
                            <th>State Initials</th>
                            <th>Country</th>
                            <th></th>
                            
                        </tr>
                        <tr id="oTable" v-for="address in Address" :value="address.AddressID" :key="address.AddressID">
                            <td v-if="address.DefaultAddress === true">Default</td>
                            <td v-else> </td>
                            <td>{{address.AddressLine1}}</td>
                            <td>{{address.AddressLine2}}</td>
                            <td>{{address.City}}</td>
                            <td>{{address.ZipCode}}</td>
                            <td>{{address.StateInitials}}</td>
                            <td>{{address.Country}}</td>
                            
                            
                            <td><button type="button" v-on:click="showModal(address.AddressID)">Edit</button></td>

                        </tr>
                    </table>
        </form>

    </div>

    <div  id="modal" class="modal" style="width:30%; margin-left:26%; transform:translate(14.2%,40%);">
        
        <div id="modal_content" class="modal_content" style="height:auto"  v-for="cusaddress in CusAddress" :value="cusaddress.AddressID" :key="cusaddress.AddressID">
            <input type="hidden" id="addID" v-model="cusaddress.AddressID"/>
            <input type="hidden" id="cusID" v-model="cusaddress.CustomerID"/>
            <label>Default Address</label><br />
            <input type="checkbox" id="defaultAdd" v-model="cusaddress.DefaultAddress"/><br />
            <label>Address Line 1</label><br />
            <input type="text" id = "A1" v-model="cusaddress.AddressLine1"/><br />
            <label>Address Line 2</label><br />
            <input type="text" id = "A2" v-model="cusaddress.AddressLine2"/><br />
            <label>City</label><br />
            <input type="text" id = "city" v-model="cusaddress.City"/><br />
            <label for="State-select">State:</label><br/>
                <select name="st" id="st" @change="stateDetail($event)" >
                    <option hidden disabled selected v-for="cusaddress in CusAddress" :value="cusaddress.AddressID" :key="cusaddress.AddressID">{{cusaddress.StateInitials}}</option>
                    <option v-for="state in State" :value="state.StateID" :key="state.StateID" > {{state.StateInitials}} </option>
                </select><br />
            <label>Country</label><br />
            <input type="text" id="country" v-model="cusaddress.Country" /><br />
            <button class="close" type="button" style="transform: translate(30%,-900%)" v-on:click="closeModal()">X</button>
            
            <button  type="button" style="transform: translate(-10%, 30%)" v-on:click="editAddress()">Save</button>
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
                address: {},
                CusAddress: [],
                cusaddress: {
                    AddressID: '',
                    DefaultAddress: '',
                    AddressLine1: '',
                    AddressLine2: '',
                    City: '',
                    StateID: '',
                    Country: '',
                    CustomerID: ''
                }
            
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

            let url2 = 'http://localhost:3000/editCustomer/' + cid

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

                this.customers.CustomerID = document.getElementById("cusID").value
                this.customers.CustomerFirstName = document.getElementById("fname").value
                this.customers.CustomerLastName = document.getElementById("lname").value
                this.customers.CustomerPhone = document.getElementById("phone").value
                this.customers.CustomerEmail = document.getElementById("email").value
                this.customers.CustomerNote = document.getElementById("note").value
                this.customers.CustomerStatusID = document.getElementById("status").value

                let url = 'http://localhost:3000/editCustomer/';

                axios.put(url, this.customers).then((res) => {
                    console.log(res)
                    this.$router.go(0)
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
            },

            showModal(id) {
                document.getElementById("modal").style.display="block";
                document.getElementById("address-div").style.display="none";
                document.getElementById("tab-div2").style.display="none";
                console.log(id)
                let url = 'http://localhost:3000/Address/' + id
                axios.get(url).then((res) => {
                    const data = res.data
                    this.CusAddress = data
                    console.log(res)

                });
                
            },

            closeModal() {
                document.getElementById("modal").style.display="none";
                document.getElementById("address-div").style.display="block";
                document.getElementById("tab-div2").style.display="block";
            },

            editAddress() {
                this.cusaddress.AddressID = document.getElementById("addID").value
                this.cusaddress.DefaultAddress = document.getElementById("defaultAdd").checked
                this.cusaddress.AddressLine1 = document.getElementById("A1").value
                this.cusaddress.AddressLine2 = document.getElementById("A2").value
                this.cusaddress.City = document.getElementById("city").value
                this.cusaddress.StateID = document.getElementById("st").value
                this.cusaddress.Country = document.getElementById("country").value
                this.cusaddress.CustomerID = document.getElementById("cusID").value

                console.log(this.cusaddress)
                let url = 'http://localhost:3000/editAddress/'
                axios.put(url, this.cusaddress).then((res) => {
                    console.log(res)
    
                }).catch(err => {
                    console.log(err)
                
                })

                document.getElementById("modal").style.display="none";
                document.getElementById("address-div").style.display="block";
                document.getElementById("tab-div2").style.display="block";
                this.$router.go(0);
            },

            fnameCheck(event) {
                let fname = event.target.value
                if (!/^[a-zA-Z()]+$/.test(fname)) {
                    alert("Incorrect Value")
                    document.getElementById("fname").value = ''
                    }
            },

            lnameCheck(event) {
                let lname = event.target.value
                if (!/^[a-zA-Z()]+$/.test(lname)) {document.getElementById("lname").value = ''}
            },

            phonecheck(event) {
                let phone = event.target.value
                if (!/^\(?\d{3}\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)) {document.getElementById("phone").value = ''} 
            },

            emailcheck(event) {
                let email = event.target.value
                let format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                if (!format.test(email)) {document.getElementById("email").value = ''}
                
            }
        }
    }
    

</script>


