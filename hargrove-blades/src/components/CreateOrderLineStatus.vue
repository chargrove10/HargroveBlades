<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Add New Order Line Status</header>
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

                <div style="width:40%; float: left; transform:translate(10%,0) ">
                    <form>
                        <label for="statusName">Status Name:</label><br/>
                        <input type="text" id="statuseName" name="statusName" v-model="orLStatus.OrderLineStatusName"/><br/>
                        <label >Active Status:</label>
                        <input type="checkbox" id="active" name="active" v-model="orLStatus.OrderLineStatusActive"/> 
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="statusDesc">Status Description:</label><br/>
                        <textarea id="statusDesc" v-model="orLStatus.OrderLineStatusDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(100%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(330%,0)" v-on:click="addOrderLineStatus()">Save</button>  
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
                OrLStatus: [],
                isShow: false,
                orLStatus: {
                    OrderLineStatusName: '',
                    OrderLineStatusDesc: '',
                    OrderLineStatusActive: ''
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            addOrderLineStatus(){

                let url = 'http://localhost:3000/addOrderLineStatus'

                let vm = this

                axios.post(url, vm.orLStatus).then(() =>{
                    this.$router.push('/orderLineStatus')
                    this.orLStatus = {
                        OrderStatusName: '',
                        OrderStatusDesc: '',
                        OrderLineStatusActive: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            },
            cancel() {
                this.$router.push('/orderLineStatus')
            }
        },

    }

</script>