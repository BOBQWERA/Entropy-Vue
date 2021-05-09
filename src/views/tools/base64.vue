<template>
  <el-main>
    <div class="container">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
        rows="8"
      >
      </el-input>
      <div class="button">
          <el-button plain @click="change">字符串转换base64</el-button>
          <el-button plain @click="reback">base64转换字符串</el-button>
      </div>
       
      <div class="line"></div>
      <div class="content">{{ changestr }}</div>
    </div>
  </el-main>
</template>

<script>
import {Base64} from 'js-base64'

export default {
  data() {
    return {
      textarea: '',
      changestr:'',
    }
  },
  methods:{
      change(){
          if (this.textarea==''){
              this.$notify.error({
                title: "转换内容为空",
              });
          } else {
              this.changestr = Base64.encode(this.textarea);
          }
      },
      reback(){
          if (this.textarea==''){
              this.$notify.error({
                title: "转换内容为空",
              });
          } else {
              this.changestr = Base64.decode(this.textarea);
          }
      }
  }
}
</script>

<style scoped>
.container{
    margin-left: 20%;
    margin-right: 20%;
}
div.line{
    margin-top: 2rem;
    border-top: 2px solid #1B9CFC;
    border-bottom: 2px solid #f45e61;
    margin-bottom: 2rem;
}
.el-button{
    margin-top: 1rem;
    margin-left: 50%;
    transform: translateX(-50%);
}

.content{
    text-align: center;
}
</style>