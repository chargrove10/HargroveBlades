<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Edit Order Status</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto;width:87.35% ;transform:translatex(3%)">
        <div style="border: thin solid black" v-for="orLStatus in OrLStatus" :key="orLStatus.OrderLineStatusID">

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
                        <input id="oLStatID" type="hidden" v-model="orLStatus.OrderLineStatusID"/>
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="editOrderLineStatus()">Save</button>  
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
                    OrderLineStatusID: '',
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

            editOrderLineStatus(){
                this.orLStatus.OrderLineStatusID = document.getElementById("oLStatID").value
                this.orLStatus.OrderLineStatusName = document.getElementById("statuseName").value
                this.orLStatus.OrderLineStatusDesc = document.getElementById("statusDesc").value
                this.orLStatus.OrderLineStatusActive = document.getElementById("active").checked

                let url = 'http://localhost:3000/OrderLineStatusEdit/'

                let vm = this

                axios.put(url, vm.orLStatus).then(() =>{
                    this.$router.push('/orderLineStatus')
                    this.orLStatus = {
                        OrderLineStatusID: '',
                        OrderLineStatusName: '',
                        OrderLineStatusDesc: '',
                        OrderLineStatusActive: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            }
        },
        created(){
            let sid = this.$route.params.orderLineStatID;
            
            console.log(sid)

            let url2 = 'http://localhost:3000/editOrderLineStatus/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.OrLStatus = data
                 console.log(this.OrLStatus)
                 

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>