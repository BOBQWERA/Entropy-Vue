<template>
  <el-main>
    <el-page-header @back="goBack" content=""> </el-page-header>
    <div class="info">
      <div class="name">官方信息</div>
      <div class="tel">电话:15662849268</div>
      <div class="email">邮箱:1044285710@qq.com</div>
      <div class="address">哈尔滨工程大学</div>
      <div class="time">2021年5月 哈尔滨</div>
    </div></el-main
  >
</template>

<script>
export default {
  name: "ConnectUs",
  data() {
      return {}
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>
div.info{
    margin-left: 50%;
    margin-top: 15rem;
    transform: translate(-50%,-50%);
    width: 20rem;
    height: 25rem;
}

.name{
    font-size: 2rem;
    font-weight: 600;
    border-bottom: 2px solid;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
}

div{
    margin-bottom: 0.5rem;
    margin-right: 1rem;
}

.time{
    text-align: right;
}
</style>
