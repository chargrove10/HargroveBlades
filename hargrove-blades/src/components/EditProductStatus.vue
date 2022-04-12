<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Edit Product Status</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto;width:87.35% ;transform:translatex(3%)">
        <div style="border: thin solid black" v-for="prStatus in PrStatus" :key="prStatus.ProductStatusID">

                <div style="width:40%; float: left; transform:translate(10%,0) ">
                    <form>
                        <label for="statusName">Status Name:</label><br/>
                        <input type="text" id="statuseName" name="statusName" v-model="prStatus.ProductStatusName"/><br/>
                        <label >Active Status:</label>
                        <input type="checkbox" id="active" name="active" v-model="prStatus.ProductStatusActive"/>    
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="statusDesc">Status Description:</label><br/>
                        <textarea id="statusDesc" v-model="prStatus.ProductStatusDesc" rows="4" cols="24"></textarea><br /> 
                        <input id="pStatID" type="hidden" v-model="prStatus.ProductStatusID"/>
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(100%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(330%,0)" v-on:click="editProcutStatus()">Save</button>
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
                PrStatus: [],
                isShow: false,
                prStatus: {
                    ProductStatusID: '',
                    ProductStatusName: '',
                    ProductStatusDesc: '',
                    ProductStatusActive: ''
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            editProcutStatus(){

                this.prStatus.ProductStatusID = document.getElementById("pStatID").value
                this.prStatus.ProductStatusName = document.getElementById("statuseName").value
                this.prStatus.ProductStatusDesc = document.getElementById("statusDesc").value
                this.prStatus.ProductStatusActive =  document.getElementById("active").checked

                let url = 'http://localhost:3000/ProductStatusEdit/'

                console.log(this.prStatus.ProductSatusID)

                axios.put(url, this.prStatus).then(() =>{
                    this.$router.push('/productStatus')
                    this.prStatus = {
                        ProductStatusID: '',
                        ProductStatusName: '',
                        ProductStatusDesc: '',
                        ProductStatusActive: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            },
            cancel() {
                this.$router.push('/productStatus')
            }
        },

        created(){
            let sid = this.$route.params.productStatID;
            
            console.log(sid)
            console.log(this.prStatus)

            let url2 = 'http://localhost:3000/editProductStatus/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.PrStatus = data
                 console.log(this.PrStatus)
                 

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>