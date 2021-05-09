<template>
  <el-main>
    <el-container>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <div class="welcome">Login</div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </el-main>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }  else {
        callback();
      }
    };
    return {
      labelPosition: 'left',
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUser, trigger: "blur" }]
      },
    };
  },
  methods: {
    submitForm(formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/user/login/",this.ruleForm)
          .then((res)=>{
            // console.log(res)
            that.$store.commit("set_username",res.data.user.username)
            that.$store.commit("set_nickname",res.data.user.nickname)
            that.$store.commit("set_user_id",res.data.user.id)
            that.$store.commit("set_credit",res.data.user.credit)
            that.$store.commit("set_score",res.data.user.score)
            that.$store.commit("set_gender",res.data.user.gender)
            that.$store.commit("set_level_type",res.data.user.level.type)
            that.$store.commit("set_level_id",res.data.user.level.id)
            that.$store.commit("set_signature",res.data.user.signature)
            that.$store.commit("set_last_signed",res.data.user.last_signed)
            that.$store.commit("set_token",res.data.access)
            window.localStorage.setItem('token',res.data.access);
            // console.log(that.$store.state.nickname)
            // console.log(res.data.user.nickname)
            this.$notify({
                title: "登录成功",
                type: "success",
              });
            that.$router.push(that.$store.state.login_jump_url);
            that.$store.commit("set_login_jump_url",'/home')
          }).catch((err)=>{
            // console.log(err.response.data)
            this.$notify.error({
                title: "登录失败",
                message: err.response.data.detail,
              });
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
div.welcome {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid;
}
form {
      margin: auto;
      margin-top: 3rem;
      padding: 5rem;
      border-radius: 30px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
label {
  text-align: left;
}

input {
  background: none;
}
</style>