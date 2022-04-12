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
        <div style="border: thin solid black" v-for="orStatus in OrStatus" :key="orStatus.OrderStatusID">

                <div style="width:40%; float: left; transform:translate(10%,0) ">
                    <form>
                        <label for="statusName">Status Name:</label><br/>
                        <input type="text" id="statuseName" name="statusName" v-model="orStatus.OrderStatusName"/><br/>
                        <label >Active Status:</label>
                        <input type="checkbox" id="active" name="active" v-model="orStatus.OrderStatusActive"/> 
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="statusDesc">Status Description:</label><br/>
                        <textarea id="statusDesc" v-model="orStatus.OrderStatusDesc" rows="4" cols="24"></textarea><br /> 
                        <input id="oStatID" type="hidden" v-model="orStatus.OrderStatusID"/>
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(100%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(330%,0)" v-on:click="editOrderStatus()">Save</button>  
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
                    OrderStatusID: '',
                    OrderStatusName: '',
                    OrderStatusDesc: '',
                    OrderStatusActive: ''
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            editOrderStatus(){
                this.orStatus.OrderStatusID = document.getElementById("oStatID").value
                this.orStatus.OrderStatusName = document.getElementById("statuseName").value
                this.orStatus.OrderStatusDesc = document.getElementById("statusDesc").value
                this.orStatus.OrderStatusActive = document.getElementById("active").checked

                let url = 'http://localhost:3000/OrderStatusEdit/'

                let vm = this

                axios.put(url, vm.orStatus).then(() =>{
                    this.$router.push('/orderStatus')
                    this.orStatus = {
                        OrderStatusID: '',
                        OrderStatusName: '',
                        OrderStatusDesc: '',
                        OrderStatusActive: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            },
            cancel() {
                this.$router.push('/orderStatus')
            }
        },
        created(){
            let sid = this.$route.params.orderStatID;
            
            console.log(sid)

            let url2 = 'http://localhost:3000/editOrderStatus/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.OrStatus = data
                 console.log(this.OrStatus)
                 

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>