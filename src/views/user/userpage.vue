<template>
  <el-main>
    <el-row>
      <el-col :span="17">
        <div v-if="selfpage()">
          <div class="title">我的个人空间</div>
          <div class="write">我写过的博客</div>
        </div>
        <div v-else>
          <div class="title">
            <span class="title">{{ owner.nickname }}的个人空间</span
            ><span class="add-friend" v-if="owner.has_apply"
              >已申请<i class="el-icon-loading"></i></span
            ><span
              class="add-friend"
              v-else-if="!owner.is_friend"
              @click="addFriend()"
              >添加好友<i class="el-icon-plus"></i
            ></span>

            <span class="add-friend" v-else
              >已添加好友<i class="el-icon-check"></i
            ></span>
          </div>
          <div class="write">{{ owner.nickname }}写过的博客</div>
        </div>
        <div v-if="blogList.length">
          <div
            v-for="blog in blogList"
            :key="blog.id"
            class="blog"
            @click="blogDetail(blog.id)"
          >
            <div class="headline">{{ blog.headline }}</div>
            <div class="abstract">{{ blog.abstract }}</div>
            <div class="author">作者:{{ blog.author.nickname }}</div>
            <div class="pub">{{ blog.pub_time }}</div>
          </div>
        </div>
        <div v-else class="no-blog">
          <div v-if="selfpage()">
            <div>你还没有写过博客哦~</div>
            <div class="create" @click="write">来写博客吧</div>
          </div>
          <div v-else>
            <div>{{ owner.nickname }}还没有写过博客哦~</div>
          </div>
        </div>
      </el-col>
      <el-col :span="7" class="side">
        <div class="side-self" v-if="selfpage()"></div>
        <div class="sign">
          <el-button plain v-if="owner.can_sign" @click="sign"
            >每日签到</el-button
          >
        </div>
        <div class="credit">信用：{{ owner.credit }}</div>
        <div class="score">积分：{{ owner.score }}</div>
        <div class="friends" v-if="selfpage()">
          <div class="info">好友列表</div>
          <div
            class="friend"
            v-for="friend in owner.friend"
            :key="friend"
          ><div class="nickname">{{friend.nickname}}</div>
          </div>
          <div v-if="owner.friend.length==0">暂无好友哦，快去添加吧</div>
          <div class="info">好友申请列表</div>
          <div class="apply" v-for="apply in owner.apply" :key="apply.user">
            <el-tooltip
              class="item"
              effect="dark"
              :content="apply.hello"
              placement="top-start"
            >
              <el-button type="text" @click="open(apply.id)">{{apply.user}}</el-button>
            </el-tooltip>
          </div>
          <div v-if="owner.apply.length==0">暂无好友好友申请</div>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "Userpage",
  data() {
    return {
      blogList: [],
      owner: null,
    };
  },
  methods: {
    getData: function () {
      var that = this;
      this.$axios
        .post("/api/blog/blog", {
          user_id: this.$store.state.temp_visit_id,
        })
        .then((res) => {
          // console.log(res.data)
          that.blogList = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
      this.$axios
        .post("/api/user/userinfo", {
          token: this.$store.state.token,
          user_id: this.$store.state.temp_visit_id,
        })
        .then((res) => {
          console.log(res.data);
          that.owner = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    blogDetail: function (id) {
      this.$store.commit("set_temp_blog_id", id);
      this.$router.push("/article");
    },
    write: function () {
      this.$router.push("/write");
    },
    selfpage: function () {
      if (!this.$store.state.flashed_page) {
        this.getData();
        this.$store.commit("set_flashed_page", true);
      }

      return (
        this.$store.state.temp_visit_id != 0 &&
        this.$store.state.temp_visit_id == this.$store.state.user_id
      );
    },
    addFriend: function () {
      console.log("I am running");
      var that = this;
      this.$axios
        .post("/api/user/addfriend", {
          token: this.$store.state.token,
          user_id: this.$store.state.temp_visit_id,
        })
        .then((res) => {
          that.owner.has_apply = True;
          this.$notify({
            title: "已申请",
            message: "等待验证",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "error!",
            message: err.response.data.detail,
          });
        });
        
    },
    open(that_id) {
        this.$confirm('是否同意添加此用户为好友?', '好友申请', {
          confirmButtonText: '同意',
          cancelButtonText: '拒绝',
          type: 'warning'
        }).then(() => {
          this.$axios
        .post("/api/user/successfriend", {
          token: this.$store.state.token,
          user_id: that_id,
          status:"add",
        })
        .then((res) => {
          this.$notify({
            title: "已添加好友！",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "error!",
            message: err.response.data.detail,
          });
        });
        this.getData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已拒绝'
          });
          this.$axios
        .post("/api/user/successfriend", {
          token: this.$store.state.token,
          user_id: that_id,
          status:"no",
        })
        .then((res) => {
          this.$notify({
            title: "已拒绝！",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "error!",
            message: err.response.data.detail,
          });
        });
        this.getData();
        });
      }
  },
};
</script>

<style scoped>
.el-col.side {
  border-left: 2px solid #666;
}

.el-row,
.el-col {
  height: 100%;
}

div.title {
  font-size: 2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 1.5rem;
  border-bottom: 3px solid;
}

span.add-friend {
  display: inline-block;
  font-size: 1.2rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  border-top: 2px solid;
  border-bottom: 2px solid;
}
span.add-friend:hover {
  border-top: 2px solid rgba(0, 0, 0, 0);
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  color: #888;
  cursor: pointer;
}

div.write {
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 1rem;
}

.blog {
  /* border: 1px solid #666; */
  margin-left: 2rem;
  margin-top: 0.5rem;
  margin-right: 20rem;
  /* border-radius: 0.8rem; */
  padding: 0.5rem;
  box-shadow: 11px 10px 30px -20px rgba(0, 0, 0, 0.75);
}

.blog:hover {
  /* border: 1px solid; */
  cursor: pointer;
  background: #888;
  opacity: 0.4;
}

.blog .headline {
  font-size: 1.25rem;
  font-weight: 575;
  border-bottom: 1px solid;
  margin-right: 70%;
}

.blog .abstract {
  margin-top: 0.5rem;
  margin-left: 1rem;
}

.blog .author,
.blog .pub {
  font-size: 0.8rem;
  text-align: right;
  margin-top: 0.3rem;
}

.no-blog {
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.5rem;
  margin-right: 80%;
}

.create {
  text-decoration: underline;
  margin-top: 0.3rem;
}

.create:hover {
  cursor: pointer;
  color: blue;
}

.side .sign {
  text-align: right;
  margin-bottom: 2rem;
}

.side .credit,
.side .score {
  text-align: right;
}
</style>
