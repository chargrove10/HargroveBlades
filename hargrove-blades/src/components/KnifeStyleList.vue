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
                <router-link to="/knifeStyleList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Knife Style</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/bladeDetails" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Steel Type</a>
                </router-link>
                
            </div>

        </div>

        <div class="tab-div2">

            <div id="KnifeStyle" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Knife Information</header></div>
                
               <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Style</label>
                        <input type="search" placeholder="Search" class="search-field" />
                         
                    </div>
                    <div class="cform2">
                        <label>Style Description</label>
                        <input type="search" placeholder="Search" class="search-field" />
                        <button type="submit" style="margin-left:2%">Apply Filter</button>
                    
                    </div>

                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                    <div class="tab-divider"></div>
                </div>

                <div class="tab-divider"></div>
           
                <div>
                    <form>
                        <table style="width:40%">
                            <tr>
                                <th>Style Name</th>
                                <th>Description</th>
                                <th>Active</th>
                            </tr>
                             <tr id="sTable" v-for="knife in Knives" :key="knife.StyleID">
                                <td>{{knife.StyleName}}</td>
                                <td>{{knife.StyleDesc}}</td>
                                <td>{{knife.KnifeStyleActive}}</td>
                                <td><router-link :to="{ name: 'Reports'}">Edit</router-link></td>
                                <!-- Place holder !-->
                             </tr>
                         </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'KnifeStyle'}"><button>Add</button></router-link>
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
                knife: {}
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
