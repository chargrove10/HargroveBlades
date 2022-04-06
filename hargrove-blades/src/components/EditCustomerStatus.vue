<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Edit Customer Status</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto">
        <div style="background-color: lightgrey" v-for="cStatus in CStatus" :key="cStatus.CustomerStatusID">

                <div style="width:40%; float: left; transform:translate(10%,0) ">
                    <form>
                        <label for="statusName">Status Name:</label><br/>
                        <input type="text" id="statuseName" name="statusName" v-model="cStatus.CustomerStatusName"/><br/>
                        <label >Active Status:</label>
                        <input type="checkbox" id="active" name="active" v-model="cStatus.CustomerStatusActive"/>                                        
                        <br/>
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="statusDesc">Status Description:</label><br/>
                        <textarea id="statusDesc" v-model="cStatus.CustomerStatusDesc" rows="4" cols="24"></textarea><br /> 
                        <input id="cStatID" type="hidden" v-model="cStatus.CustomerStatusID"/>
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="editCustomerStatus()">Save</button>    
            </div> 

        </div>

    </div>

</div>
</template>

<script>
import axios from 'axios'

    export default {
        data(){
            return{
                CStatus: [],
                cStatus: {
                    CustomerStatusID: '',
                    CustomerStatusName: '',
                    CustomerStatusDesc: '',
                    CustomerStatusActive: ''
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            editCustomerStatus(){

                this.cStatus.CustomerStatusID = document.getElementById("cStatID").value
                this.cStatus.CustomerStatusName = document.getElementById("statuseName").value
                this.cStatus.CustomerStatusDesc = document.getElementById("statusDesc").value
                this.cStatus.CustomerStatusActive = document.getElementById("active").checked

                let url = 'http://localhost:3000/CustomerStatusEdit/'

                console.log(this.cStatus)

                axios.put(url, this.cStatus).then(() =>{
                    this.$router.push('/status')
                    this.cStatus = {
                        CustomerStatusID: '',
                        CustomerStatusName: '',
                        CustomerStatusDesc: '',
                        CustomerStatusActive: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            },
        },

        created(){
            let sid = this.$route.params.customerStatID;
            
            console.log(sid)
            console.log(this.cStatus)

            let url2 = 'http://localhost:3000/editCustomerStatus/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.CStatus = data
                 console.log(this.CStatus)
                 

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>