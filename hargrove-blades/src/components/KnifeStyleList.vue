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

            <div id="KnifeStyle" class="tabcontent" style="display:block">
                <div style="text-align:center"><header>Knife Information</header></div>
                
               <div class="tab-divider"></div>
                

                <div class="tab-divider"></div>
           
                <div>
                    <form>
                        <table style="width:94%; margin-left:3%;">
                            <tr>
                                <th style="text-align:right; width:15%">Style Name</th>
                                <th style="text-align:right; width:35%">Description</th>
                                <th style="text-align:right">Active</th>
                                <th></th>
                            </tr>
                             <tr id="sTable" v-for="knife in Knives" v-bind:key="knife.StyleID">
                                <td style="text-align:right; width:15%">{{knife.StyleName}}</td>
                                <td style="text-align:right; width:35%">{{knife.StyleDesc}}</td>
                                <td style="text-align:right" v-if="knife.KnifeStyleActive === true">Active</td>
                                <td style="text-align:right" v-else>Inactive</td>
                                <td><router-link :to="{ name: 'EditKnifeStyle', params: {knifeID: knife.StyleID, flag: knife.KnifeStyleActive}}"><button style="width:30% !important">Edit</button></router-link></td>
                                
                                <!-- Place holder !-->
                             </tr>
                         </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'KnifeStyle'}"><button style="transform: translate(95%, -10%)">Add</button></router-link>
                </div>
                

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>
import axios from 'axios';

export default {
        data() {
            return {
                Knives: [],
                isShow: false,
                knife: {
                   StyleID: '',
                   StyleName: '',
                   StyleDesc: '',
                   KnifeStyleActive: ''

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

            steelTypeList() {
                this.$router.push('/bladeDetails')
            }
        },

        created() {
            axios.get('http://localhost:3000/knifeStyleList').then((res) => {
                this.Knives=res.data;
                    
            }).catch(err => {
                console.log(err)
            });

        },    



  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
