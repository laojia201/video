<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in 3" :key="item" @click="toShowPictureVideo(item)">{{item}}</van-swipe-item>
    </van-swipe>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">电影</van-tabbar-item>
      <van-tabbar-item icon="friends-o">动漫</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    toShowPictureVideo(data) {
      console.log(data);
    }
  },
  components:{
      
  }
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>