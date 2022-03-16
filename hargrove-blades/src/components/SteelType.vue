<template>
<div class="form-div">

    <div style="text-align:center;margin-bottom:20px">
        <header>Add New Knife Style</header>
    </div>
      

    
        <div style="background-color: lightgrey">

                <div style="width:35%; float: left">
                    <form>
                        <label for="steelName">Steel Name:</label><br/>
                        <input type="text" id="steelName" name="steelName" value="Test"/><br/>
                        <label for="steelActive">Steel Ative:</label><br/>
                        <input type="text" id="steelActive" name="steelActive" value="Test"/><br/>   
                        
                    </form>
                </div>

                <div style="width:35%; margin-left: 25%">
                    <form>
                        <label for="steelDesc">Steel Description:</label><br/>
                        <textarea id="steelDesc" rows="4" cols="24"></textarea><br /> 
                    </form>
                </div>
                
                <div style="margin-center: 30%">
                    <router-link :to="{ name: 'BladeDetails'}"><button>Blade Details</button></router-link>
                    <div class="divider"></div>
                    <button>Add</button>
                </div>

        </div>
        
</div>
</template>

<script>

</script>