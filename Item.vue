<script setup>
    import { ref , onMounted } from 'vue';
    import axios  from 'axios';
    const data = ref([])
    const s = ref(0)
    const e = ref(8)
    const loadingActive = ref(true)
    const ActivePopdetail = ref(false)
    // Item of Popupdetail
    const NameDetail = ref([])
    const ImgDetail = ref([])
    const PriceDetail = ref([])
    const Price_DesDetail = ref([])
    const Detail = ref([])
   const SubImg = ref([])
    const getItem = () =>{
        let url = `https://la3la3.com/home/api/get-product.php?s=${s.value}&e=${e.value}`
        axios.get(url)
        .then(
            (rp) =>{
                rp.data.forEach(el => {
                   data.value.push(el)
                });
                loadingActive.value = false
            }
            
        )
    }
    onMounted( () =>{
        getItem()
    //    e.value = 4
    }) 
    const SetImg = (i , img) =>{
        // console.log(i)
        //1          = 1
                          //img from imglist assign by paramite
        data.value[i].img = img
    }
    const getMoreData = () =>{
        // e.value = e.value - e.value
        // e.value=4
        s.value = s.value + e.value
       
        loadingActive.value = true
        getItem()
    }
    const GetDetail = (i ) =>{
      
      ActivePopdetail.value = true
      NameDetail.value = data.value[i]['name']
      ImgDetail.value = data.value[i]['img']
      PriceDetail.value = data.value[i]['price']
      
      Price_DesDetail.value = data.value[i]['price_dis']
      Detail.value = data.value[i]['des']
      SubImg.value = data.value[i]['imgList']
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
    <div class="container">
        <div class="row">
            <div class="col-xl-3 col-lg-3 item-box" v-for="(item,i1) in data" :key="i1">
                <div class="box">
                    <div class="img-box" @click="GetDetail(i1)">
                                    <!--img from item  -->
                        <img :src="item.img" alt="">
                    </div>
                    <div class="txt-box">
                        <h1>{{item.name }}</h1>
                        <h2>${{ item.price}}</h2>
                        <ul>
                                              <!--  img from imglist -->
                            <li @click="SetImg(i1 , img)" :class="{'active':item.img ==img}"  v-for="(img , i2) in item.imgList.slice(0,2)" :key="i2">
                                <img :src="img" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
           
        </div>
        <div class="popup" v-show="loadingActive">
                 <div class="loading">

                 </div>
         </div>
        <div class="row">
            <div class="col-xl-12 col-lg-12 btn-More" @click="getMoreData">
                <div>
                    View More
                </div>
            </div>
        </div>
        <div class="popdetail" v-show="ActivePopdetail">
            <div class="frm" v-for="(itemdetail , i3) in data" :key="i3">
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