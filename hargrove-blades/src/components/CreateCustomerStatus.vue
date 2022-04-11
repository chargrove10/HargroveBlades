<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Add New Customer Status</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto;width:87.35% ;transform:translatex(3%)">
        <div style="border: thin solid black">

                <div style="width:40%; float: left; transform:translate(10%,0)">
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
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="addCustomerStatus()">Save</button>  
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
                isShow: false,
                cStatus: {
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

            addCustomerStatus(){

                let url = 'http://localhost:3000/addCustomerStatus'

                let vm = this

                axios.post(url, vm.cStatus).then(() =>{
                    this.$router.push('/status')
                    this.cStatus = {
                        CustomerStatusName: '',
                        CustomerStatusDesc: '',
                        CustomerStatusActive: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            }
        },

    }

</script>