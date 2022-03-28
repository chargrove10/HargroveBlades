<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Input Product Information</header>
    </div>

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="serialNo">Serial Number </label><br/>
                        <input type="text" id="serialNo" name="serialNo" value="1234era54t"/><br/>
                        <label for="prodStatus">Product Status </label><br/>
                        <select name="ps" id ="ps" @change="prodStatus($event)" v-model="product.ProductStatusName">
                            <option v-for="productDropDown in ProductDropDown" v-bind:value="productDropDown.ProductStatusID" :key="productDropDown.ProductStatusID"> {{productDropDown.ProductStatusName}} </option>
                        </select><br/>
                        <label for="knifeStyle">Knife Style</label><br/>
                        <select name="ks" id ="ks" @change="knifeStatus($event)" v-model="product.StyleName">
                            <option v-for="knifeDropDown in KnifeDropDown" v-bind:value="knifeDropDown.StyleID" :key="knifeDropDown.StyleID"> {{knifeDropDown.StyleName}} </option>
                        </select><br/>
                        <label for="steelType">Steel Type</label><br/>
                        <select name="st" id ="st" @change="steelStatus($event)" v-model="product.SteelName">
                            <option v-for="steelDropDown in SteelDropDown" v-bind:value="steelDropDown.SteelID" :key="steelDropDown.SteelID"> {{steelDropDown.SteelName}} </option>
                        </select><br/> 
                        <label for="price">Price</label><br/>
                        <input type="text" id="price" name="price" value="Test"/><br/> 
                        <label for="completeDate">Complete Date</label><br/>
                        <input type="date" id="completeDate" name="completeDate" /><br/>    
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label for="handleMaterial">Handle Material </label><br/>
                        <input type="text" id="handleMaterial" name="handleMaterial" value="Test"/><br/> 
                        <label for="bladeLength">Blade Length </label><br/>
                        <input type="text" id="bladeLength" name="bladeLength" value="11"/><br/>
                        <label for="overallLength">Overall Length </label><br/>
                        <input type="text" id="overallLength" name="overallLength" value="15"/><br/>
                        <label for="bladeFinish">Blade Finsih </label><br/>
                        <input type="text" id="bladeFinish" name="bladefinish" value="Test"/><br/>
                        <label for="embellishments">Embellishments </label><br/>
                        <input type="text" id="embellishments" name="embellishments" value="Test"/><br/>
                        <label for="notes">Product Notes:</label><br/>
                        <textarea id="Note" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>

                <button style="transform:translate(90%,0)">Save</button>

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
                    ProductNotes: '',
                    ProductStatusName: '',
                    StyleName: '',
                    SteelName: ''                   
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
            let url = 'http://localhost:3000/product33';

            axios.get(url).then((response) => {
                this.Products = response.data
                console.log(this.Products)
            }).catch(err => {
                console.log(err)
            });

            axios.get('http://localhost:3000/productDropDown').then((statusDropDown) => {
                this.ProductDropDown = statusDropDown.data
            }).catch(err => {
                console.log(err)
            });

            axios.get('http://localhost:3000/knifeDropDown').then((knifeDropDown) => {
                this.KnifeDropDown = knifeDropDown.data
            }).catch(err => {
                console.log(err)
            });

            axios.get('http://localhost:3000/steelDropDown').then((steelDropDown) => {
                this.SteelDropDown = steelDropDown.data
            }).catch(err => {
                console.log(err)
            });
        },

        methods: {
            home() {
                this.$router.push('/customerList')
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
            }
        }       
        
    }

</script>


