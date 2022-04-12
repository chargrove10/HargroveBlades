<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Edit Knife Style</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto; width:87.35% ;transform:translatex(3%)">
        <div style="border: thin solid black" v-for="knife in Knives" :key="knife.StyleID" >

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="styleName">Style Name:</label><br/>
                        <input type="text" id="styleName" name="styleName" v-model="knife.StyleName"/><br/>
                        <label >Knife Style Active:</label>
                        <input type="checkbox" id="active" @change="getChecked($event)" name="active" v-model="knife.KnifeStyleActive"/>                                        
                        <br/>  
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="styleDesc">Style Description:</label><br/>
                        <textarea id="styleDesc" v-model="knife.StyleDesc" rows="4" cols="24"></textarea><br /> 
                        <input id="styleID" type="hidden" v-model="knife.StyleID"/>
                        
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(100%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(330%,0)" v-on:click="addKnifeStyle()">Save</button>  

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
                Knives: [],
                knife: {
                    StyleID: '',
                    StyleName: '',
                    KnifeStyleActive: '',
                    StyleDesc: '',
                }
            }
        },
        methods: {
            home() {
                this.$router.push('/customerList')
            },

            getChecked(e) {
                this.knife.KnifeStyleActive = e.target.checked;
                console.log(e.target.checked)
                console.log(this.knife.StyleID)
            },

            editKnifeStyle(){



                this.knife.StyleID = document.getElementById("styleID").value
                this.knife.StyleName = document.getElementById("styleName").value
                this.knife.StyleDesc = document.getElementById("styleDesc").value
                this.knife.KnifeStyleActive = document.getElementById("active").checked
                

                let url = 'http://localhost:3000/knifeStyleEdit/'
                

                axios.put(url, this.knife).then(() =>{
                    this.$router.push('/knifeStyleList')
                    this.knife = {
                        StyleID: '',
                        StyleName: '',
                        KnifeStyleActive: '',
                        StyleDesc: ''
                    }
                }).catch(err =>{
                    console.log(err)
                });

            },

            cancel() {
                this.$router.push('/knifeStyleList')
            }

        },
        created(){
            let sid = this.$route.params.knifeID;
            

            let url2 = 'http://localhost:3000/editKnifeStyle/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.Knives = data
                 console.log(this.Knives)
                 

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>