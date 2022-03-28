<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Add New Product Status</header>
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
                        <input type="text" id="statuseName" name="statusName" v-model="prStatus.ProductStatusName"/><br/>
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="statusDesc">Status Description:</label><br/>
                        <textarea id="statusDesc" v-model="prStatus.ProductStatusDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="addProductStatus()">Save</button>  
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
                    ProductStatusName: '',
                    ProductStatusDesc: '',
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            addProductStatus(){

                let url = 'http://localhost:3000/addProductStatus'

                let vm = this

                axios.post(url, vm.prStatus).then(() =>{
                    this.$router.push('/productStatus')
                    this.prStatus = {
                        ProductStatusName: '',
                        ProductStatusDesc: '',
                    }
                }).catch(err =>{
                    console.log(err)
                });

            }
        },

    }

</script>