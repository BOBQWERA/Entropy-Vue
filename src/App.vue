<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6"><h3>校园互动平台</h3></el-col>
          <el-col :span="14">
            <el-menu :default-active="'1'" mode="horizontal">
              <el-menu-item
                v-for="menu in menuList"
                :key="menu.strid"
                :index="menu.strid.toString()"
                @click="$router.push('/' + menu.url)"
              >
                <span>{{ menu.name }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="2" v-if="$store.state.nickname">
            <div class="nickname user-info" @click="userpage">
              你好:{{ $store.state.nickname }}!
            </div>
          </el-col>
          <el-col :span="2" v-if="$store.state.nickname" >
            <el-button plain class="user-info" @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <router-view />
      <el-footer>
        <el-row>
          <el-col :span="2"><span @click="$router.push('/connectus')">联系我们</span></el-col>
          <el-col :span="2"><span @click="$router.push('/findbug')">报错</span></el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    var that = this;
    this.$axios.post("/api/info/headermenu",{
      token:this.$store.state.token,
    }).then(function (response) {
      // console.log(response.data);
      that.menuList = response.data;
    });
  },
  methods: {
    logout:function () {
        localStorage.removeItem("token");
        this.$store.commit("reset")
        this.$notify({
                title: "退出登录成功",
                type: "success",
              });
        this.$router.push('/home')
    },
    userpage:function () {
        this.$store.commit("set_temp_visit_id",this.$store.state.user_id)
        this.$store.commit("set_flashed_page",false)
        this.$router.push({name:'userpage',params:{user_id:this.$store.state.user_id}})
        
    }
  }
};
</script>

<style  scoped>
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.el-container {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  /* background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%); */
  /* background: -webkit-linear-gradient(to right, #00c9ff, #92fe9d); */
  background: #70e1f5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffd194, #70e1f5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffd194, #70e1f5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.el-header {
  background-color: none;
  box-shadow: 0 0 10px 0 #000;
  border-bottom: 3px solid #2ecc71;
  z-index: 10;
}

.el-menu {
  background: none;
  border: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #3498db;
}

.el-menu--horizontal > .el-menu-item:hover {
  background: none;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: none;
}

.el-main {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  /* background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%); */
  background: #70e1f5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffd194, #70e1f5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffd194, #70e1f5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.el-footer {
  height: 1rem;
}

.el-footer span{
  text-align: center;
  line-height: 60px;
}

.el-footer span:hover{
  color: #666;
  cursor: pointer;
}

.user-info {
  height: 56px;
  text-align: center;
}

div.user-info {
  line-height: 56px;
  font-weight: 550;
}

div.user-info:hover{
  color:#10ac84;
  cursor: pointer;
}
</style>



