<script setup>
    import { useRoute } from 'vue-router';
    import {ref , onMounted , watchEffect , watch} from 'vue'
    import axios from 'axios';
    const route = useRoute()
    const data = ref([])
    const s = ref(0)
    const e = ref(3)
   
    const ItemData = ref([])
    const loadingActive = ref(true)
    const cid = ref(0)
    const sid = ref(0)
    const ActivePopdetail = ref(false)
    // Item of Popupdetail
    const NameDetail = ref([])
    const ImgDetail = ref([])
    const PriceDetail = ref([])
    const Price_DesDetail = ref([])
    const Detail = ref([])
   const SubImg = ref([])
    const getSubcategory = () =>{
        let url = `https://la3la3.com/home/api/get-sub-category.php?cate-id=${route.params.cid}`
        axios.get(url)
        .then(
            (rp)=>{
                data.value = rp.data
                // console.log(data)
            }
        )
    }
    const getItembyMenu =() =>{
        if( !route.params.sid){
            var url = `https://la3la3.com/home/api/get-product.php?cate-id=${route.params.cid}&s=${s.value}&e=${e.value}`
        }else{
            var url = `https://la3la3.com/home/api/get-product.php?sub-cate-id2=${route.params.sid}&s=${s.value}&e=${e.value}`
        }
        
        axios.get(url)
        .then(
            (rp)=>{
                rp.data.forEach(el=>{
                    ItemData.value.push(el)
                })
                // console.log(ItemData)
                loadingActive.value = false
            }
            
        )
    }
    const SetImg = (i , img) =>{
        // console.log(i)
        //1          = 1
                          //img from imglist assign by paramite
        ItemData.value[i].img = img
    }

    
    // onMounted(() =>{
    //     getSubcategory()
    // })
    watch( [cid,sid] ,  ( [newCid ,newSid] , [ OldCid , OldSid] )=>{
        if(newCid != OldCid){
            ItemData.value = []
            s.value = 0 
            getSubcategory()
        }else if(newSid != OldSid){
            ItemData.value = []
            s.value = 0 
        }
        // console.log("Old id", OldCid)
        // console.log("New id", newCid)
        getItembyMenu()
        
    })  
    watchEffect(()=>{
    //    console.log(data.value)
    console.log(ItemData.value)
        cid.value = route.params.cid
        if(route.params.sid){
            sid.value = route.params.sid
        }
    })
    
    // document.title = data.value.sub['name']
    // console.log( data.value.name)
    onMounted(()=>{
        getSubcategory()
        // getItembyMenu()
    })
    const ActiveLeftSubMenu = (item) =>{
        // console.log(item)
        item['active-sub'] = !item['active-sub'] // true  false
    }
    const getMoreData = () =>{
        // e.value = e.value - e.value
        // e.value=4
        s.value = s.value + e.value
        // console.log('s=',s.value)
        // console.log('e=',e.value)

        
        getItembyMenu()
        // console.log(ItemData.value)
        // console.log(ItemData.length)
        // if(ItemData.value == ItemData.value){
        //     console.log("no data")
        //     alert("No More data")
        // }
        loadingActive.value = true
       
        
    }
    const GetDetail = (i ) =>{
      
        ActivePopdetail.value = true
        NameDetail.value = ItemData.value[i]['name']
        ImgDetail.value = ItemData.value[i]['img']
        PriceDetail.value = ItemData.value[i]['price']
        
        Price_DesDetail.value = ItemData.value[i]['price_dis']
        Detail.value = ItemData.value[i]['des']
        SubImg.value = ItemData.value[i]['imgList']
        console.log(SubImg)

        // ItemData.value[i].name = NameDetail.value
        // console.log(NameDetail.value)
    }
    const closePopDetail = () =>{
       
        ActivePopdetail.value =false
        // console.log("close")
    }
    const setDetailImg = (img)=>{
        ImgDetail.value = img
    }
</script>

<template>
    <div class="container" style="margin-top: 10px;">
        <div class="row">
            <div class="col-xl-3 col-lg-3 left-menu">
                <ul>
                    <li v-for="(item , i) in data" :key="i">
                        <a @click="ActiveLeftSubMenu(item)" :class="{'active':item['active-sub']}"> 
                            <span>{{item.name }} </span>
                            <i class="fa-solid fa-plus" v-if=" item['active-sub'] == false"></i>
                            <i class="fa-solid fa-minus" v-else></i>
                        </a>
                        <div class="left-sub-menu">
                            <ul>
                                <li v-for="(Subitem , i2) in item.sub" :key="i2" v-if="item['active-sub']">
                                    <RouterLink :to="{name:'subitem', params:{cid: Subitem.category, sid:Subitem.id }}">{{ Subitem.name}}</RouterLink>      
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-xl-9 col-lg-9 data">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 item-box" v-for="(item,i1) in ItemData" :key="i1" > 
                        <div class="box">
                            <div class="img-box"  @click="GetDetail(i1)">
                                            <!--img from item  -->
                                <img :src="item.img" alt="">
                            </div>
                            <div class="txt-box">
                                <h1>{{item.name }}</h1>
                                <h2>${{ item.price}}</h2>
                                <ul>
                                                    <!--  img from imglist -->
                                    <li @click="SetImg(i1 , img)" :class="{'active':item.img ==img}"  v-for="(img , i2) in item.imgList.slice(0,3)" :key="i2">
                                        <img :src="img" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                         </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 btn-More" @click="getMoreData">
                        <div>
                            View More
                        </div>
                    </div>  
                </div>
            </div>
            
        </div>
        
        <div class="popup" v-show="loadingActive">
                 <div class="loading">

                 </div>
         </div>
         <div class="popdetail" v-show="ActivePopdetail">
            <div class="frm" v-for="(itemdetail , i3) in ItemData" :key="i3">
                    <div class="img-box">
                        <img :src="ImgDetail" alt="">
                    </div>
                    <div class="sub-img-box">   
                        <ul >                                                           
                            <li  @click="setDetailImg(img)" :class="{'active':ImgDetail ==img}" v-for="(img , i4) in SubImg" :key="i4">
                                <img :src="img" alt="">
                            </li>
                        </ul>
                    </div>
                    <div class="description"  >

                      <h1>{{ NameDetail}}</h1>
                      <span id="Price"> ${{ PriceDetail }} </span>
                      <span id="Price_des">${{ Price_DesDetail }}</span>
                      <p v-html="Detail "></p>

                    </div>
                    <div class="btn-Close" @click="closePopDetail"> 
                        <i class="fa-solid fa-xmark"></i>
                    </div>
            </div>
        </div>
    </div>
</template>