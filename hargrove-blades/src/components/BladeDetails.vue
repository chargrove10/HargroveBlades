<template>
<div id = 'app'>
  <div class="main-title">
        <h1 class="title">Hargrove-Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">

                <button v-on:click = home()>Home</button>
                <div class="tab-divider"></div>
                <button v-on:click ="openKnifeStyle(event, 'KnifeStyle')">Knife Style</button>
                <div class="tab-divider"></div>
                <button v-on:click ="openSteelType(event, 'SteelType')">Steel Type</button>
                
            </div>

        </div>

        <div class="tab-div2">

            <div id="SteelType" class="tabcontent">
                <div style="background-color:lightgray; text-align:center"><header>Steel Information</header></div>
                
                <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Steel Name</label>
                        <input type="text" id="steelName" name="steelName" value="Test"/><br/>
                    </div>
                    <div class="cform2">
                        <label>Steel Description</label>
                        <input type="text" id="steelDesc" name="steelDesc" value="Test" /><br />
                    
                    </div>

                    <div class="tab-divider"></div>
                </div>

                <div class="search-button">
                        <button>Search</button>
                </div>
                
                <div class="tab-divider"></div>
                
                <form>
                    <table>
                        <tr>
                            <th>Steel Name</th>
                            <th>Description</th>
                            <th>Active</th>
                        </tr>
                        <tr>
                            <td>Carbon Steel</td>
                            <td>Most common 10XX steel</td>
                            <td>1</td>
                        </tr>
                    </table>
                </form>

                <div class="tab-divider"></div>

                <div>
                    <button>Edit</button>
                    <div class="divider "></div>
                    <router-link :to="{ name: 'SteelType'}"><button>Add</button></router-link>
                </div>
            </div>

            <div id="KnifeStyle" class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Knife Information</header></div>
                
               <div class="tab-divider"></div>
                <div>
                    <div class="cform1">
                        <label>Style</label>
                        <input type="text" id="styleName" name="styleName" value="Test"/><br/>
                    </div>
                    <div class="cform2">
                        <label>Style Description</label>
                        <input type="text" id="styleDesc" name="styleDesc" value="Test" /><br />
                    
                    </div>

                    <div class="tab-divider"></div>
                </div>
                
                <div class="search-button">
                        <button>Search</button>
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
                    <button >Edit</button>
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
                this.$router.push('/')
            },

            openSteelType(event, Order) {
        var i, tabcontent, tablink;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablink = document.getElementsByClassName("tablink");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("active", "");
        }

        document.getElementById(Order).style.display = "block";
        event.currentTarget.className += "active";
            },

        openKnifeStyle(event, Product) {
        var i, tabcontent, tablink;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablink = document.getElementsByClassName("tablink");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace("active", "");
        }

        document.getElementById(Product).style.display = "block";
        event.currentTarget.className += "active";
            }

        },

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
