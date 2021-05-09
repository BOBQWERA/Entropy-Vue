<template>
  <el-main>
    <el-input v-model="headline" placeholder="请输入标题"></el-input>
    <el-input v-model="abstract" placeholder="请输入摘要"></el-input>
    <textarea id="editor" rows="10" cols="80" v-model="context"></textarea>
    <div class="submit" @click="send">发布</div>
  </el-main>
</template>
<script>
import CKEDITOR from "CKEDITOR";
export default {
  name: "write",
  data() {
      return {
          editor:null,
          context:"",
          headline:"",
          abstract:"",
      }
  },
  mounted() {
    this.editor=CKEDITOR.replace("editor", {
      height: "340px",
      width: "100%",
      toolbar: "Full",
    });
  },
  methods:{
      send:function () {
          var context = this.editor.document.getBody().getHtml()
          this.$axios.post("/api/blog/blog/0",{
              context:context,
              headline:this.headline,
              abstract:this.abstract,
              user_id:this.$store.state.user_id,
              token:this.$store.state.token,
          })
          .then((res)=>{
              this.$notify({
                title: "发布成功",
                type: "success",
              });
              this.$router.push('/blog')
          })
          .catch((err)=>{
              this.$notify.error({
                title: "发布失败",
                message: err.response.data.detail,
              });
          })
      }
  }
};
</script>

<style scoped>
</style>