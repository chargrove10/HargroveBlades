<template>
<div id = 'app'>
  <div class="main-title">
      <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">

                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/bladeDetails" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Steel Type</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/knifeStyleList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Knife Style</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2">

            <div class="tabcontent">
                <div style="text-align:center"><header>Steel Information</header></div>
                
                <div class="tab-divider"></div>
                
                <div class="tab-divider"></div>
                                    <router-link :to="{ name: 'SteelType'}"><button style="transform: translate(60%, -10%); ">Add Steel</button></router-link>

                <form>
                    <table style="width:95%">
                        <tr>
                            <th style="width: 3%"></th>
                            <th style="text-align:left; width:10%">Steel Name</th>
                            <th style="text-align:left">Description</th>
                            <th style="text-align:left">Active</th>
                            <th></th>
                        </tr>
                        <tr id="dTable" v-for="steel in Steels" :key="steel.SteelID">
                            <td></td>
                            <td style="text-align:left; width:10%">{{steel.SteelName}}</td>
                            <td style="text-align:left">{{steel.SteelDesc}}</td>
                            <td style="text-align:left" v-if="steel.KnifeSteelActive === true">Active</td>
                            <td style="text-align:left" v-else>Inactive</td>
                            <td><router-link :to="{ name: 'EditSteelType', params: {steelID: steel.SteelID, flag: steel.KnifeSteelActive}}"><button style="width:25% !important">Edit Blade</button></router-link></td>
                            
                                <!-- Place holder !-->
                        </tr>
                    </table>
                </form>

                <div class="tab-divider"></div>

                <div>
                </div>
            </div>

        </div>
        
    </div>
</div>



</template>

<script>
import axios from 'axios'

export default {
         data() {
            return {
                Steels: [],
                isShow: false,
                steel: {
                    SteelID: '',
                    SteelName: '',
                    SteelDesc: '',
                    KnifeSteelDesc: ''
                }
                //pass over to product detail to see if we are posting or editing
                
            }
        },

        methods: {

            home() {
                this.$router.push('/customerList')
            },

            knifeStyleList() {
                this.$router.push('/knifeStyleList')
            },

            // steelTypeList() {
            //     this.$router.push('/bladeDetails')
            // },
        },
            created() {
                axios.get('http://localhost:3000/bladeDetails').then((res) => {
                    this.Steels=res.data;
                    console.log(this.Steels)
                }).catch(err => {
                     console.log(err)
                });

            },    


  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
