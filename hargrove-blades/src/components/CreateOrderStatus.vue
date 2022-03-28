<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Add New Order Status</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0) ">
                    <form>
                        <label for="statusName">Status Name:</label><br/>
                        <input type="text" id="statuseName" name="statusName" v-model="orStatus.OrderStatusName"/><br/>
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="statusDesc">Status Description:</label><br/>
                        <textarea id="statusDesc" v-model="orStatus.OrderStatusDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="addOrderStatus()">Save</button>  
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
                OrStatus: [],
                isShow: false,
                orStatus: {
                    OrderStatusName: '',
                    OrderStatusDesc: '',
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            addOrderStatus(){

                let url = 'http://localhost:3000/addOrderStatus'

                let vm = this

                axios.post(url, vm.orStatus).then(() =>{
                    this.$router.push('/orderStatus')
                    this.orStatus = {
                        OrderStatusName: '',
                        OrderStatusDesc: '',
                    }
                }).catch(err =>{
                    console.log(err)
                });

            }
        },

    }

</script>