<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Edit Knife Steel</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
<div class="tab-div2" style="min-height:auto; width:87.35% ;transform:translatex(3%)">
        <div style="border: thin solid black" v-for="steel in Steel" :key="steel.SteelID"> 

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="steelName">Steel Name:</label><br/>
                        <input type="text" id="steelName" name="steelName"  v-model="steel.SteelName"/><br/>
                        <label for="steelActive">Steel Active:</label><br/>
                       <input type="checkbox" id="active" @change="getChecked($event)" name="active" v-model="steel.KnifeSteelActive"/>                                        
                        <br/>  
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="steelDesc">Steel Description:</label><br/>
                        <textarea id="steelDesc"  v-model="steel.SteelDesc" rows="4" cols="24"></textarea><br /> 
                        <input id="steelID" type="hidden" v-model="steel.SteelID"/>
                    </form>
                </div>
                
            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="editKnifeSteel()">Save</button>  
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
                Steel: [],
                steel: {
                    SteelID: '',
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

            getChecked(e) {
                this.steel.KnifeSteelActive = e.target.checked;
                console.log(e.target.checked)
                console.log(this.steel.SteelID)
            },

            editKnifeSteel(){

                this.steel.SteelID = document.getElementById("steelID").value
                this.steel.SteelName = document.getElementById("steelName").value
                this.steel.SteelDesc = document.getElementById("steelDesc").value
                this.steel.KnifeSteelActive = document.getElementById("active").checked
                
                console.log(this.steel)
                let url = 'http://localhost:3000/steelTypeEdit/'
                

                axios.put(url, this.steel).then(() =>{
                    this.$router.push('/bladeDetails')
                    this.steel = {
                        SteelID: '',
                        SteelName: '',
                        KnifeSteelActive: '',
                        SteelDesc: '',
                    }
                }).catch(err =>{
                    console.log(err)
                });

            }

        },
        created(){
            let sid = this.$route.params.steelID;
            
            console.log(sid)

            let url2 = 'http://localhost:3000/editSteelType/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.Steel = data
                 console.log(this.Steel)
                 

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>