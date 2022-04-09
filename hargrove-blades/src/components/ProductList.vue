<template>
<div id = 'app'>
  <div class="main-title">
    
        <img src='../assets/sponsor.jpg' height='100' width='100' align="left">
        
    
        <h1 class="title">Hargrove Blades</h1>
    </div>

    <div class="main-content">

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Customer</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/orderList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Order</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/productList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Product</a>
                </router-link>
                <div class="tab-divider"></div>
                <router-link to="/bladeDetails" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Blade Details</a>
                </router-link>
                <div class="tab-divider" />
                <router-link to="/" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Reports</a>
                </router-link>
                <router-link to="/status" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Status</a>
                </router-link>
            </div>

        </div>

        <div class="tab-div2" style="min-height:auto">

            <div class="tabcontent" style="display:block">
                <div style="background-color:lightgray; text-align:center"><header>Product Information</header></div>
                <div class="tab-divider"></div>
                <div>
                    <div class="pform1">
                        <label>Serial Number</label>
                        <input type="search" id="serial" placeholder="Search" class="search-field" style="width:40%" />

                    </div>
                    <div class="pform2">
                        <label>Knife Style</label>
                        <input type="search" id="knife" placeholder="Search" class="search-field" style="width:40%" />
                                     
                    </div>
                    <div class="pform3">
                        <label>Steel Type</label>
                        <input type="search" id="steel" placeholder="Search" class="search-field" style="width:40%" />
                        <button type="submit" style="margin-left:2%" v-on:click="applyFilter()">Apply Filter</button>
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
                        <table style="width:95%">
                            <tr>
                                <th>Serial Number</th>
                                <th>Product Status</th>
                                <th>Knife Style</th>
                                <th>Steel Type</th>
                                <th>Handle Material</th>
                                <th>Blade Length</th>
                                <th>Overall Length</th>
                                <th>Embellishments</th>
                                <th> </th>

                            </tr>
                            <tr id="pTable" v-for="products in Products" :key="products.ProductID">
                                <td>{{products.SerialNo}}</td>
                                <td>{{products.ProductStatusName}}</td>
                                <td>{{products.StyleName}}</td>
                                <td>{{products.SteelName}}</td>
                                <td>{{products.HandleMaterial}}</td>
                                <td>{{products.BladeLength}}</td>
                                <td>{{products.OverallLength}}</td>
                                <td>{{products.Embellishments}}</td>
                                <td hidden>{{products.StyleID}}</td>
                                <td hidden>{{products.ProductID}}</td>
                                <td hidden>{{products.SteelID}}</td>
                                <td><router-link :to="{ name: 'EditProduct', params: {productID: products.ProductID, productStatusId: products.ProductStatusID, styleId: products.StyleID, steelId: products.SteelID}}">Edit</router-link></td>
                                <!-- Place holder !-->
                            </tr>
                        </table>
                    </form>
                </div>
                <div class="tab-divider"></div>

                <div>
                    <router-link :to="{ name: 'ProductDetail'}"><button>Add</button></router-link>
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
                Products: [],
                isShow: false,
                products: {
                    StyleID: '',
                    StyleName: '',
                    SteelName: '',
                    ProductStatusName: '',
                    CompleteDate: '',
                    Price: '',
                    SerialNo: '',
                    OverallLength: '',
                    BladeFinish: '',
                    BladeLength: '',
                    Embellishments: '',
                    HandleMaterial: '',
                    ProductNote: ''
                }
                //pass over to product detail to see if we are posting or editing
                
            }
        },
        methods: {

            product() {
                this.$router.push('/productList')
            },

            reports() {
                this.$router.push('/')
            },

            bladeDetails() {
                this.$router.push('/bladeDetails')
            },

            order() {
                this.$router.push('/orderList')
            },

            customer() {
                this.$router.push('/customerList')
            },

            async applyFilter() {
                               
                let serial = document.getElementById("serial").value;
                let knife = document.getElementById("knife").value;
                let steel = document.getElementById("steel").value

                if (serial == "")
                    serial = '""'
                
                if (knife == "")
                    knife = '""'

                if (steel == "")
                    steel = '""'

                if ((serial =="" || serial ==null) && (knife =="" || knife==null) && (steel =="" || steel==null)) {
                    this.refreshPage();
                }
                
                //this is the link to filter by the fields selected
                // let url = 'http://localhost:3000/productList/' + serial + '&' + knife + '&' + steel;
                let url = 'http://localhost:3000/productList/' + serial + '&' + knife + '&' + steel;
                

                axios.get(url)
                    .then(response => {
                    
                    this.Products=response.data
                    console.log(response.data)
                });
  
            },

            refreshPage() {
                //This is refreshing the page so that the table will load properly once he zeroes out search fields
                this.$router.go(0);

            },

        },
        created() {

            axios.get('http://localhost:3000/productList').then((res) => {
                this.Products=res.data;
                
            }).catch(err => {
                console.log(err)
            });

        },

  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/style.css"></style>
