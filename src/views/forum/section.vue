<template>
  <el-main>
    <el-page-header @back="goBack" content=""> </el-page-header>
    <el-page-header @back="write" title="发帖" content=""> </el-page-header>
    <div class="container">
      <div class="title">{{ section.name }}</div>
      <div v-if="postingList.length" class="postings">
        <div
          class="posting"
          v-for="posting in postingList"
          :key="posting.id"
          @click="postingDetail(posting.id)"
        >
          <div class="headline">{{ posting.headline }}</div>
          <div class="text">{{ posting.text }}</div>
          <div class="update-time">最后回复于:{{ posting.update_time }}</div>
        </div>
      </div>
    </div>
  </el-main>
</template>


<script>
export default {
  name: "SectionDetail",
  data() {
    return {
      section: {},
      postingList: [],
    };
  },
  created() {
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
    this.$axios
      .get("/api/forum/posting", {
        params: { sid: this.$store.state.temp_section_id },
      })
      .then((res) => {
        console.log(res.data);
        that.postingList = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    goBack(){
      this.$router.push('/forum')
    },
    postingDetail: function (id) {
      this.$store.commit("set_temp_posting_id", id);
      this.$router.push("/posting");
    },
    goLogin: function () {
      this.$store.commit("set_login_jump_url",this.$route.path)
      this.$router.push('/login')
    },
    write(){
      this.$router.push('/writeposting')
    }
  },
};
</script>

<style scoped>
div.container {
  margin-left: 20%;
  margin-right: 20%;
}

div.title {
  font-size: 3rem;
  font-weight: 600;
  border-bottom: 2px solid;
  text-align: center;
}

.postings .posting {
  margin-top: 2rem;
  margin-left: 2rem;
  border-left: 4px solid;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  box-shadow: 11px 10px 30px -20px rgba(0, 0, 0, 0.75);
}

.postings .posting:hover {
  cursor: pointer;
  border-left: 4px solid #f45e61;
  transition: 0.2s;
}

.postings .posting .headline {
  margin-bottom: 0.3rem;
  font-size: 1.25rem;
}

.postings .posting .text {
  font-size: 0.9rem;
  margin-left: 0.3rem;
  margin-bottom: 0.4rem;
}

.postings .posting .update-time {
  font-size: 0.8rem;
  text-align: right;
  margin-right: 0.2rem;
}

.postings .posting .section {
  font-size: 0.8rem;
  text-align: right;
  margin-right: 0.2rem;
}
</style>