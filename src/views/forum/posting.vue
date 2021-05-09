<template>
  <el-main>
    <el-page-header @back="goBack" content=""> </el-page-header>
    <el-row class="main">
      <el-col :span="16" class="content">
        <div class="posting">
          <div class="headline">{{ posting.headline }}</div>
          <div class="text">{{ posting.text }}</div>
          <el-row class="info">
            <el-col :span="15" >&nbsp;</el-col>
            <el-col :span="3" style="text-align: right"
              ><div class="landlord" >
                {{ posting.landlord.nickname }}
              </div></el-col
            >
            <el-col :span="6" style="text-align: right"
              ><div class="pub-time">发布于:{{ posting.pub_time }}</div></el-col
            >
          </el-row>
        </div>
        <div class="scroll-container">
          <div class="comments">
            <div v-if="commentList.length">
              <div
                class="comment"
                v-for="comment in commentList"
                :key="comment.id"
              >
                <el-row class="info">
                  <el-col :span="6"
                    ><div
                      class="publisher"
                      @click="authorDetail(comment.publisher.id)"
                    >
                      {{ comment.publisher.nickname }}
                    </div></el-col
                  >
                  <el-col :span="2" style="float: right; text-align: right"
                    ><div class="floor">#{{ comment.floor }}</div></el-col
                  >
                </el-row>
                <div class="number">No.{{ comment.id }}</div>
                <div class="comment-content">{{ comment.content }}</div>
              </div>
            </div>
            <div v-else>
              <div class="message">还没有评论哦，快来抢占沙发吧~</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="7">
        <div v-if="isLogin" class="write">
          <div class="info">留下你的足迹</div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="100"
            rows="10"
            show-word-limit
          >
          </el-input>
          <div class="button">
            <el-button plain @click="sendComment"
              >发送<i class="el-icon-s-promotion"></i
            ></el-button>
          </div>
        </div>
        <div v-else class="login">
          <div class="info">还没有登录，无法进行评论哦</div>
          <div class="go" @click="goLogin()">去登录吧</div>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "PostingDetail",
  data() {
    return {
      posting: {},
      commentList: [],
      textarea: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user_id != 0;
    },
  },
  created() {
    var that = this;
    this.$axios
      .get("/api/forum/posting", {
        params: { pid: this.$store.state.temp_posting_id },
      })
      .then((res) => {
        console.log(res.data);
        that.posting = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.$axios
      .get("/api/forum/comment", {
        params: { pid: this.$store.state.temp_posting_id },
      })
      .then((res) => {
        console.log(res.data);
        that.commentList = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    authorDetail(id) {
      this.$store.commit("set_temp_visit_id", id);
      this.$store.commit("set_flashed_page", false);
      this.$router.push({ name: "userpage", params: { user_id: id } });
    },
    goBack() {
      this.$router.go(-1);
    },

    goLogin() {
      this.$store.commit("set_login_jump_url", this.$route.path);
      this.$router.push("/login");
    },
    sendComment() {
      var that = this;
      this.$axios
        .post("/api/forum/comment", {
          user_id: this.$store.state.user_id,
          token: this.$store.state.token,
          pid: this.posting.id,
          content: this.textarea,
        })
        .then((response) => {
          this.$axios
            .get("/api/forum/comment", {
              params: { pid: this.$store.state.temp_posting_id },
            })
            .then((res) => {
              console.log(res.data);
              that.commentList = res.data;
              that.textarea = "";
            })
            .catch((err) => {
              console.log(err.response);
            });
        })
        .catch((err) => {
          this.$notify.error({
            title: "发送失败",
            message: err.response.data.detail,
          });
        });
    },
  },
};
</script>

<style scoped>
.el.row .main {
  display: flex;
  justify-content: space-between;
}

.posting {
  border-bottom: 2px solid;
  margin-bottom: 0.5rem;
}

.posting .headline {
  margin-top: 2rem;
  font-size: 1.6rem;
  font-weight: 550;
  border-bottom: 2px solid;
}

.posting .text {
  margin-top: 1rem;
  margin-bottom: 1rem;
  /* margin-left: 0.5rem; */
}

.posting .info {
  margin-bottom: 0.5rem;
}

.write .info {
  margin-top: 3rem;
  font-size: 1.6rem;
  font-weight: 550;
  text-align: right;
  border-right: 4px solid #f45e61;
  padding-right: 0.5rem;
  margin-bottom: 1rem;
}

.write .el-input {
  margin-left: 5rem;
}

.comments {
  padding-right: 2rem;
  margin-right: 40%;
  overflow: scroll;
  height: 25rem;
  
}
::-webkit-scrollbar{
    width: 3px;
    height: 0;
}

::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background: #535353;
}

::-webkit-scrollbar-track{
    border-radius: 10px;
    background: #ededed;
}
.comments .comment {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
  margin-top: 1rem;
  border-bottom: 1px solid #aaa;
}

.comments .comment .info {
  margin-bottom: 0.3rem;
}

.comments .comment .publisher {
  font-weight: 600;
  cursor: pointer;
}

.comments .comment .number {
  color: #888;
  text-align: right;
  font-size: 0.5rem;
}
div.button {
  float: right;
  margin-top: 0.5rem;
}

.login .info {
  margin-top: 4rem;
}

.login .go:hover {
  color: #444;
  cursor: pointer;
}
</style>