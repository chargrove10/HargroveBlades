<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Input Product Information</header>
    </div>

    <div class="tab-div1">
        
        <div class="tab">
        <button v-on:click=home()>Home</button>
        </div>

    </div> 
    
    <div class="tab-div2">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="serialNo">Serial Number </label><br/>
                        <input type="text" id="serialNo" name="serialNo" value="1234era54t"/><br/>
                        <label for="prodStatus">Product Status </label><br/>
                        <input type="text" id="prodStatus" name="prodStatus" value="Pending"/><br/>
                        <label for="knifeStyle">Knife Style</label><br/>
                        <input type="text" id="knifeStyle" name="knifeStyle" value="Test"/><br/>
                        <label for="steelType">Steel Type</label><br/>
                        <input type="text" id="steelType" name="steelType" value="Test"/><br/> 
                        <label for="price">Price</label><br/>
                        <input type="text" id="price" name="price" value="Test"/><br/> 
                        <label for="completeDate">Complete Date</label><br/>
                        <input type="date" id="completeDate" name="completeDate"/><br/>    
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

                <button style="transform:translate(40%,0)">Save</button>

        </div>
    </div>
</div>
</template>

<script>

    export default {
        methods: {
            home() {
                this.$router.push('/customerList')
            }
        }
    }

</script>


