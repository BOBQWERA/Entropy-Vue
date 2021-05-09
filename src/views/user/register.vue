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
        <div class="welcome">Register</div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input
            type="password"
            v-model="ruleForm.checkpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="gender"
          :rules="{
            required: true,
            message: '请选择活动资源',
            trigger: 'change',
          }"
        >
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请正确填写手机号"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'left',
      ruleForm: {
        username: "",
        password: "",
        nickname: "",
        checkpass: "",
        telephone: "",
        gender: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUser, trigger: "blur" }],
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }],
        telephone: [{ validator: validatePhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/user/register/", this.ruleForm)
            .then((response) => {
              this.$notify({
                title: "注册成功",
                message: "跳转到登录页面",
                type: "success",
              });
              that.$router.push("/login");
            })
            .catch((err) => {
              this.$notify.error({
                title: "注册失败",
                message: err.response.data.detail,
              });
            });
        } else {
          this.$notify.error({
                title: "格式不正确",
                message: "请修改标红的字段",
              });
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
</style>