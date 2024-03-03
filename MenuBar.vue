<script setup>
    import { ref  , onMounted} from 'vue';
    import axios from 'axios'
    import {CateData } from './Store';
    
    // const data = ref([])
    const loading = ref(false) ;
    
    const ActiveMenu = ref(false)

    // const isActiveMenu = () =>{
    //     ActiveMenu.value = !ActiveMenu.value   
    // }
    const getCategory = () =>{
        let url = "https://la3la3.com/home/api/get-category.php"
        axios.get(url)
       .then( 
            (rp) =>{
                // data.value = rp.data
                CateData.value = rp.data
                loading.value = true
                // console.log(data)
                console.log(CateData)
            }
        )  
    }
    onMounted( ()=>{
        getCategory()
       
    })
</script>

<template>
     <div class="container-fluid menu-bar">
        <div class="container">
            <div class="popup" v-if=" !loading">
                        <div class="loading">

                        </div>
            </div>
            <div class="row">
                <div class="col-xl-12 col-lg-12 menu-box" >
                    <ul >
                        <li >
                            
                            <RouterLink to="/">
                                <i class="fa-solid fa-house"></i>
                            </RouterLink>
                        </li>
                        <li v-for="(item , i) in CateData" :key="i"  >

                          
                         <RouterLink :class="{'menuActive':ActiveMenu ==i }" :to="{name:'item', params:{cid:item.id}}">

                            {{item.name }}
                        </RouterLink>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </div>

    </div>

</template>
<style>

</style>