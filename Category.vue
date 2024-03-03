<script setup>
    import { CateData } from './Store';
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-3 col-lg-3 cate-box" v-for="(item, i) in CateData" :key="i">
                <div class="box">
                    <img :src="item.img" alt="">
                    <h1>{{item.name }}</h1>
                </div>
            </div>
          
        </div>
    </div>
</template>