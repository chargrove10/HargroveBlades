<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px; color:white">
        <header>Edit Product Information</header>
    </div>

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2"  style="width:87.35% ;transform:translatex(3%); min-height:0;">
        <div style="border: thin solid black; height:auto" v-for="product in Products" :value="product.ProductID" :key="product.ProductID">
                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <input type="hidden" id="prodId" v-model="product.ProductID"/>
                        <label for="serialNo">Serial Number </label><br/>
                        <input type="text" id="serialNo" name="serialNo" v-model="product.SerialNo" readonly/><br/>
                        <label for="prodStatus">Product Status </label><br/>
                        <select name="ps" id ="ps" @change="prodStatus($event)">
                            <option id="startStatus" hidden disabled selected :value="product.ProductStatusID">{{product.ProductStatusName}}</option>
                            <option v-for="productDropDown in ProductDropDown" :value="productDropDown.ProductStatusID" :key="productDropDown.ProductStatusID"> {{productDropDown.ProductStatusName}} </option>
                        </select><br/>
                        <label for="knifeStyle">Knife Style</label><br/>
                        <select name="ks" id ="ks" @change="knifeStatus($event)" >
                            <option hidden disabled selected :value="product.StyleID" >{{product.StyleName}}</option>
                            <option v-for="knifeDropDown in KnifeDropDown" :value="knifeDropDown.StyleID" :key="knifeDropDown.StyleID"> {{knifeDropDown.StyleName}} </option>
                        </select><br/>
                        <label for="steelType">Steel Type</label><br/>
                        <select name="st" id ="st" @change="steelStatus($event)" >
                            <option hidden disabled selected :value="product.StyleID">{{product.SteelName}}</option>
                            <option v-for="steelDropDown in SteelDropDown" :value="steelDropDown.SteelID" :key="steelDropDown.SteelID"> {{steelDropDown.SteelName}} </option>
                        </select><br/> 
                        <label for="price">Price</label><br/>
                        <input type="text" id="price" name="price" v-model="product.Price"/><br/> 
                        <label for="completeDate">Complete Date</label><br/>
                        <input @change="dateGet($event)" type="date" id="completeDate" name="completeDate" :value="product.CompleteDate.slice(0,10)" /><br/>    
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label for="handleMaterial">Handle Material </label><br/>
                        <input type="text" id="handleMaterial" name="handleMaterial" v-model="product.HandleMaterial"/><br/> 
                        <label for="bladeLength">Blade Length </label><br/>
                        <input type="text" id="bladeLength" name="bladeLength" v-model="product.BladeLength"/><br/>
                        <label for="overallLength">Overall Length </label><br/>
                        <input type="text" id="overallLength" name="overallLength" v-model="product.OverallLength"/><br/>
                        <label for="bladeFinish">Blade Finsih </label><br/>
                        <input type="text" id="bladeFinish" name="bladefinish" v-model="product.BladeFinish"/><br/>
                        <label for="embellishments">Embellishments </label><br/>
                        <input type="text" id="embellishments" name="embellishments" v-model="product.Embellishments"/><br/>
                        <label for="notes">Product Notes:</label><br/>
                        <textarea id="Note" rows="4" cols="24" @change="getNotes($event)" v-model="product.ProductNote"></textarea><br /> 
                    </form>
                </div>

                <button style="transform:translate(90%,0)" v-on:click="cancel()">Cancel</button>
                <button style="transform:translate(200%,0)" v-on:click="editProduct()">Save</button>

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
                product: {
                    ProductID: '',
                    StyleID: '',
                    SteelID: '',
                    ProductStatusID: '',
                    CompleteDate: '',
                    Price: '',
                    SerialNo: '',
                    OverallLength: '',
                    BladeFinish: '',
                    BladeLength: '',
                    Embellishments: '',
                    HandleMaterial: '',
                    ProductNote: '',
                    StyleName: '',
                    SteelName: '',
                    ProductStatusName: '',
                    ProductNotes: ''                 
                },
                ProductDropDown: [],
                productDropDown: {
                    ProductStatusID: '',
                    ProductStatusName: ''
                },
                KnifeDropDown: [],
                knifeDropDown: {
                    StyleID: '',
                    StyleName: ''
                },
                SteelDropDown: [],
                steelDropDown: {
                    SteelID: '',
                    SteelName: ''
                }
            }
        },

        created() {
            let prodId = this.$route.params.productID;

            let url = 'http://localhost:3000/knifeDropDown'

            axios.get(url).then((res) => {
                this.KnifeDropDown = res.data
            }).catch(err => {
                console.log(err)
            });

            let url2 = 'http://localhost:3000/steelDropDown'

            axios.get(url2).then((res) => {
                this.SteelDropDown = res.data
            }).catch(err => {
                console.log(err)
            });

            //console.log(prodStatId)
            console.log("This is the prodID "+ prodId)
            

            let url3 = 'http://localhost:3000/getProductStatus'

            axios.get(url3).then((res) => {
                this.ProductDropDown = res.data
            }).catch(err => {
                console.log(err)
            });

            let url4 = 'http://localhost:3000/editProduct/' +prodId
            
            axios.get(url4).then((res) => {
                this.Products = res.data
            }).catch(err => {
                console.log(err)
            });
        },

        methods: {
            home() {
                this.$router.push('/customerList')
            },

            cancel() {
                this.$router.push('/productList')
            },

            editProduct(){
                
                console.log("This is product StatusID "+ this.product.ProductStatusID)
                let url = 'http://localhost:3000/editProduct/';

                this.product.ProductID = document.getElementById("prodId").value 
                this.product.StyleID = document.getElementById("ks").value
                this.product.SteelID = document.getElementById("st").value
                this.product.ProductStatusID = document.getElementById("ps").value
                this.product.CompleteDate = document.getElementById("completeDate").value
                this.product.Price = document.getElementById("price").value
                this.product.SerialNo = document.getElementById("serialNo").value
                this.product.OverallLength = document.getElementById("overallLength").value
                this.product.BladeFinish = document.getElementById("bladeFinish").value
                this.product.BladeLength = document.getElementById("bladeLength").value
                this.product.Embellishments = document.getElementById("embellishments").value
                this.product.HandleMaterial = document.getElementById("handleMaterial").value
                this.product.ProductNote = document.getElementById("Note").value 

                console.log(this.product.ProductNotes)

                 axios.put(url, this.product).then((response) => {
                      console.log(response)
                      this.$router.push('/productList')
                  }).catch(err => {
                      console.log(err)
                  })
            },

            prodStatus(e) {
                this.product.ProductStatusID = e.target.value
                console.log(this.product.ProductStatusID)
            },

            knifeStatus(e) {
                this.product.StyleID = e.target.value
                console.log(this.product.StyleID)
            },

            steelStatus(e) {
                this.product.SteelID = e.target.value
                console.log(this.product.SteelID)
            },

            dateGet(e) {
                this.product.CompleteDate = e.target.value
                console.log(this.product.CompleteDate)
            },

            getNotes(e) {
                this.product.ProductNotes = e.target.value
                console.log(this.product.ProductNotes)
            }
        }       
        
    }

</script>