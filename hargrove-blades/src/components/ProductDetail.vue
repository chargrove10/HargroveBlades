<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Input Product Information</header>
    </div>
    
        <div style="background-color: lightgrey">

                <div style="width:50%; float: left">
                    <form>
                        <label for="fname">Serial Number </label><br/>
                        <input type="text" id="serialNo" name="serialNo" value="1234era54t"/><br/>
                        <label for="lname">Product Status </label><br/>
                        <input type="text" id="prodStatus" name="prodStatus" value="Pending"/><br/>
                        <label for="phone">Knife Style</label><br/>
                        <input type="text" id="knifeStyle" name="knifeStyle" value="Test"/><br/>
                        <label for="email">Steel Type</label><br/>
                        <input type="text" id="steelType" name="steelType" value="Test"/><br/>                
                     
                    </form>
                </div>

                <div style="width:50%; margin-left: 50%">
                    <form>
                        <label for="notes">Handle Material </label><br/>
                        <input type="text" id="handleMaterial" name="handleMaterial" value="Test"/><br/> 
                        <label for="fname">Blade Length </label><br/>
                        <input type="text" id="bladeLength" name="bladeLength" value="11"/><br/>
                        <label for="fname">Overall Length </label><br/>
                        <input type="text" id="overallLength" name="overallLength" value="15"/><br/>
                        <label for="fname">Embellishments </label><br/>
                        <input type="text" id="embellishments" name="embellishments" value="Test"/><br/>
                    </form>
                </div>

                <div>
                    <router-link :to="{ name: 'MainPage'}"><button>Home</button></router-link>
                </div>

        </div>
        
</div>
</template>

<script>

</script>


