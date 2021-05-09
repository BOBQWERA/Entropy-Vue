<template>
  <el-main>
    <el-page-header @back="goBack" content="">
</el-page-header>
    <el-row>
      <div v-if="article">
        <div class="headline">{{ article.headline }}</div>
        <el-row class="article-info"
          ><el-col :span="7" style="text-align: right">|</el-col
          ><el-col :span="5"
            ><div class="author" @click="authorDetail(article.author.id)">
              作者:{{ article.author.nickname }}
            </div></el-col
          >
          <el-col :span="5"
            ><div class="pub">{{ article.pub_time }}</div></el-col
          ><el-col :span="7">|</el-col></el-row
        >
        <div class="text" v-html="article.text"></div>
      </div>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "BlogDetail",
  data() {
    return {
      article: {},
    };
  },
  created() {
    var that = this;
    this.$axios
      .get("/api/blog/blog/" + this.$store.state.temp_blog_id)
      .then((res) => {
        console.log(res.data);
        that.article = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    blogDetail: function (id) {
      this.$store.commit("set_temp_blog_id", id);
      this.$router.push("/article");
    },
    authorDetail: function (id) {
      this.$store.commit("set_temp_visit_id", id);
      this.$store.commit("set_flashed_page",false)
      this.$router.push({name:'userpage',params:{user_id:id}});
      
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.headline {
  text-align: center;
  font-size: 2rem;
  font-weight: 575;
  border-bottom: 2px solid;
  margin-left: 20%;
  margin-right: 20%;
}

.author,
.pub {
  text-align: center;
}

.author:hover{
  cursor: pointer;
  color: blue;
}

.article-info {
  border-bottom: 2px solid;
  margin-left: 20%;
  margin-right: 20%;
}

.text {
  margin-left: 20%;
  margin-right: 20%;
}
</style>