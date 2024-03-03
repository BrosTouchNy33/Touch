<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import { Navigation } from 'swiper/modules' ;
    import { ref, onMounted } from 'vue';
    import axios from 'axios'
    const modules = [Navigation]
    const data = ref([])
    const getSlide =  (i) =>{
        let url = "https://la3la3.com/home/api/get-slide.php" 
        axios.get(url)
        .then(
            (rp) =>{
                data.value = rp.data 
                // data.value.name = i
                // console.log( data.value['name'])
                // console.log(data)
            }
        )
    }
    onMounted( () =>{
        getSlide()
    })
        
</script>

<template>
    <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 slide-container">
                    <swiper
                       
                        @swiper="onSwiper"
                        :navigation="true" :modules="modules" class="mySwiper"
                    >
                        <swiper-slide v-for="(item , i) in data" :key="i">
                            <img :src="item.img" alt="">
                            <h1>Shop Now</h1>
                            <h2 >{{item.name }}</h2>
                            <!-- <h1 v-for="(items,i2) in data" :key="i2">{{items.name}} </h1> -->
                        </swiper-slide>
                       
                    </swiper>
                </div>
            </div>
    </div>
</template>