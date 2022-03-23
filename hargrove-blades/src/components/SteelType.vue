<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Add New Steel Type</header>
    </div>
      

        <div class="tab-div1">

            <div class="tab">
                
                <router-link to="/customerList" custom v-slot="{navigate, href}">
                <a :href="href" @click="navigate">Home</a>
                </router-link>
                
            </div>

        </div>
    
    <div class="tab-div2" style="min-height:auto">
        <div style="background-color: lightgrey">

                <div style="width:40%; float: left; transform:translate(10%,0)">
                    <form>
                        <label for="steelName">Steel Name:</label><br/>
                        <input type="text" id="steelName" name="steelName" value="Test"/><br/>
                        <label for="steelActive">Steel Ative:</label><br/>
                        <input type="text" id="steelActive" name="steelActive" value="Test"/><br/>   
                        
                    </form>
                </div>

                <div style="width:40%; margin-left: 50%">
                    <form>
                        <label for="steelDesc">Steel Description:</label><br/>
                        <textarea id="steelDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>
                
            <div>
                <div class="tab-divider"/>
                <button style="transform:translate(90%,0)">Save</button>  
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