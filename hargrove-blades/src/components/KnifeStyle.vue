<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Add New Knife Style</header>
    </div>
      
    <div class="tab-div1">
        
        <div class="tab">
        <button v-on:click=home()>Home</button>
        </div>

    </div>
    
    <div class="tab-div2" style="min-height:auto">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0) ">
                    <form>
                        <label for="styleName">Style Name:</label><br/>
                        <input type="text" id="styleName" name="styleName" value="Test"/><br/>
                        <label for="knifeStyleActive">Knife Style Ative:</label><br/>
                        <input type="text" id="knifeStyleActive" name="knifeStyleActive" value="Test"/><br/>   
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="styleDesc">Style Description:</label><br/>
                        <textarea id="styleDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>

            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(40%,0)">Save</button>  
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
            }
        }
    }

</script>