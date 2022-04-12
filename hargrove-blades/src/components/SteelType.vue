<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Add New Steel Type</header>
    </div>
      

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto; width:87.35% ;transform:translatex(3%)">
        <div style="border: thin solid black">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="steelName">Steel Name:</label><br/>
                        <input type="text" id="steelName" name="steelName"  v-model="steel.SteelName"/><br/>
                        <label for="steelActive">Steel Ative:</label><br/>
                       <input type="checkbox" id="active" name="active" v-model="steel.KnifeSteelActive"/>                                        
                        <br/>  
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="steelDesc">Steel Description:</label><br/>
                        <textarea id="steelDesc"  v-model="steel.SteelDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>
                
            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(100%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(330%,0)" v-on:click="addKnifeSteel()">Save</button>  
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
                Steels: [],
                isShow: false,
                steel: {
                    SteelName: '',
                    KnifeSteelActive: '',
                    SteelDesc: '',
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            addKnifeSteel(){

                let url = 'http://localhost:3000/steelTypeAdd'

                let vm = this

                axios.post(url, vm.steel).then(() =>{
                    this.$router.push('/bladeDetails')
                    this.steel = {
                        SteelName: '',
                        KnifeSteelActive: '',
                        SteelDesc: '',
                    }
                }).catch(err =>{
                    console.log(err)
                });

            },

            cancel() {
                this.$router.push('/bladeDetails')
            }
        },

    }

</script>