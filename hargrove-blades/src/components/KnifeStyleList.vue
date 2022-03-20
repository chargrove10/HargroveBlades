<template>
<div id = 'app'>
  <div class="main-title">
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab" style="transform: translate(20%, 40%)">

                <button v-on:click = home()>Home</button>
                <div class="tab-divider"></div>
                <button v-on:click = knifeStyleList()>Knife Style</button>
                <div class="tab-divider"></div>
                <button v-on:click = steelTypeList()>Steel Type</button>
                
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
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    </div>
                    <div class="cform2">
                        <label>Style Description</label>
                        <input type="search" placeholder="Search" class="search-field" />
                            <button type="submit" class="search-button">
                                <img src="../assets/search.png">
                            </button>
                    
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
                        <table>
                            <tr>
                                <th>Style Name</th>
                                <th>Description</th>
                                <th>Active</th>
                            </tr>
                             <tr>
                                <td>Chef's Knife</td>
                                <td>Knife of a Chef</td>
                                <td>1</td>
                             </tr>
                         </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'KnifeStyle'}"><button>Edit</button></router-link>
                    <div class="divider "></div>
                    <router-link :to="{ name: 'KnifeStyle'}"><button>Add</button></router-link>
                </div>
                

            </div>
        
        </div>
        
    </div>
</div>



</template>

<script>

export default {


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

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
