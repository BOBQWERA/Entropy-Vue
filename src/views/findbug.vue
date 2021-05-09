<template>
  <el-main>
    <el-page-header @back="goBack" content=""> </el-page-header></el-main
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