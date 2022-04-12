<template>
<div class="form-div">

    <div style="color: white; text-align:center;margin-bottom:20px">
        <header>Input Product Information</header>
    </div>

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="width:87.35% ;transform:translatex(3%)">
        <div style="border:thin solid black; height:auto">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="serialNo">Serial Number </label><br/>
                        <input type="text" id="serialNo" name="serialNo" maxlength="10" v-model="product.SerialNo"/><br/>
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
                        <input type="text" id="price" name="price" v-model="product.Price"/><br/> 
                        <label for="completeDate">Complete Date</label><br/>
                        <input @change="dateGet($event)" type="date" id="completeDate" name="completeDate" v-model="product.CompleteDate" /><br/>    
                    </form>
                </div>

                <div style="width:40%; margin-left: 60%">
                    <form>
                        <label for="handleMaterial">Handle Material </label><br/>
                        <input type="text" id="handleMaterial" name="handleMaterial" maxlength="50" v-model="product.HandleMaterial"/><br/> 
                        <label for="bladeLength">Blade Length </label><br/>
                        <input type="text" id="bladeLength" name="bladeLength" v-model="product.BladeLength"/><br/>
                        <label for="overallLength">Overall Length </label><br/>
                        <input type="text" id="overallLength" name="overallLength" v-model="product.OverallLength"/><br/>
                        <label for="bladeFinish">Blade Finish </label><br/>
                        <input type="text" id="bladeFinish" name="bladefinish" maxlength="50" v-model="product.BladeFinish"/><br/>
                        <label for="embellishments">Embellishments </label><br/>
                        <input type="text" id="embellishments" name="embellishments" v-model="product.Embellishments"/><br/>
                        <label for="notes">Product Notes:</label><br/>
                        <textarea id="Note" rows="4" cols="24" @change="getNotes($event)" v-model="product.ProductNotes"></textarea><br /> 
                    </form>
                </div>

                <button style="transform:translate(90%,0)" v-on:click="addProduct()">Save</button>

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

            addProduct(){
                
                
                let url = 'http://localhost:3000/productAdd';

                 axios.post(url, this.product).then(() => {
                     this.$router.push('/productList')
                        this.product = {
                            //assigning all values as empty
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
                        }
                 }).catch(err => {
                     console.log(err)
                 });
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


