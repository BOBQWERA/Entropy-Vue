<template>
  <el-main
    >
    <el-page-header @back="goBack" content=""> </el-page-header>
    <div class="inputbox">
        <div class="section">{{section.name}}</div>
      <el-input v-model="headline" placeholder="请输入内容"></el-input
      ><el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="text"
        maxlength="100"
        show-word-limit
        rows="5"
      ></el-input>
      <el-button plain @click="sendPosting"
        >发送<i class="el-icon-s-promotion"></i
      ></el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      headline: "",
      text: "",
      section:{},
    };
  },
  created(){
    var that = this;
    this.$axios
      .get("/api/forum/section", {
        params: { sid: this.$store.state.temp_section_id },
      })
      .then((res) => {
        console.log(res.data);
        that.section = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    goBack(){
        this.$router.go(-1);
    },
    sendPosting() {
        // alert(this.$store.state.temp_section_id)
      this.$axios
        .post("/api/forum/posting", {
          user_id: this.$store.state.user_id,
          sid: this.$store.state.temp_section_id,
          headline: this.headline,
          text: this.text,
          token: this.$store.state.token,
        })
        .then((res) => {
          this.$notify({
            title: "发布成功",
            type: "success",
          });
          this.$router.push("/blog");
        })
        .catch((err) => {
          this.$notify.error({
            title: "发布失败",
            message: err.response.data.detail,
          });
        });
    },
  },
};
</script>


<style scoped>
div.inputbox {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 10rem;
}
.el-button {
  margin-left: 50%;
  transform: translateX(-50%);
}
.section{
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    border-bottom: 2px solid;
    text-align: center;
}
</style>