<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Add New Knife Style</header>
    </div>
      
    <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto">
        <div style="background-color: lightgrey" v-for="knife in Knives" :key="knife.StyleID" >

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="styleName">Style Name:</label><br/>
                        <input type="text" id="styleName" name="styleName" v-model="knife.StyleName"/><br/>
                        <label >Knife Style Active:</label>
                        <input type="checkbox" id="active" name="active" v-model="knife.KnifeStyleActive"/>                                        
                        <br/>  
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="styleDesc">Style Description:</label><br/>
                        <textarea id="styleDesc" v-model="knife.StyleDesc" rows="4" cols="24"></textarea><br /> 
                        
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)" v-on:click="editKnifeStyle()">Save</button>  
                <br />
                <button v-on:click="getChecked()">Get Checked Value</button>
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

            editKnifeStyle(){

                var flag = document.getElementById("active").checked;
                if (flag === true)
                    this.knife.KnifeStyleActive = true;
                else
                    this.knife.KnifeStyleActive = false;

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

            getChecked() {
                var flag = document.getElementById("active").checked;
                if (flag === true)
                    this.knife.KnifeStyleActive = 1;
                else
                    this.knife.KnifeStyleActive = 0;

                console.log(this.knife.KnifeStyleActive)
            }

        },
        created(){
            let sid = this.$route.params.knifeID;
            

            let url2 = 'http://localhost:3000/editKnifeStyle/' + sid

             axios.get(url2).then((response) => {
                 const data = response.data
                 //had to loop through Customer to assign to customers{}
                 this.Knives = data

             }).catch(err => {
                 console.log(err)
             })
        }

    }

</script>