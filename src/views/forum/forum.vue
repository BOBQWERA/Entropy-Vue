<template>
  <el-main>
    <div class="container">
      <el-row><div class="title">工程论坛</div></el-row>
      <el-row>
        <el-col :span="9" class="sections">
          <div
            class="section"
            @click="sectionDetail(section.id)"
            v-for="section in sectionList"
            :key="section.id"
          >
            <div class="name">{{ section.name }}</div>
          </div>
        </el-col>
        <el-col :span="15" class="postings">
          <div
            class="posting"
            @click="postingDetail(posting.id)"
            v-for="posting in postingList"
            :key="posting.id"
          >
            <div class="headline">{{ posting.headline }}</div>
            <div class="text">{{ posting.text }}</div>
            <div class="update-time">最后回复于:{{ posting.update_time }}</div>
            <div class="section">{{ posting.section.name }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
// import func from 'vue-editor-bridge';
export default {
  name: "Forum",
  data() {
    return {
      sectionList: [],
      postingList: [],
    };
  },
  created() {
    var that = this;
    this.$axios
      .get("/api/forum/section")
      .then((res) => {
        console.log(res.data);
        that.sectionList = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.$axios
      .get("/api/forum/posting")
      .then((res) => {
        console.log(res.data);
        that.postingList = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  methods: {
    sectionDetail: function (id) {
      this.$store.commit("set_temp_section_id", id);
      this.$router.push("/section");
    },
    postingDetail: function (id) {
      this.$store.commit("set_temp_posting_id", id);
      this.$router.push("/posting");
    },
    // write:function () {
    //     this.$router.push("/write")
    // }
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

.postings {
  border-left: 2px solid;
  overflow: scroll;
  height: 30rem;
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

.sections .section {
  font-size: 1.5rem;
  font-weight: 550;
  margin-top: 1rem;
  margin-right: 0.5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  box-shadow: 11px 10px 30px -20px rgba(0, 0, 0, 0.75);
}

.sections .section:hover {
  background: #888;
  opacity: 0.4;
  cursor: pointer;
  transition: 0.2s;
}

.postings .posting {
  margin-top: 2rem;
  margin-left: 2rem;
  border-left: 4px solid;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  box-shadow: 11px 10px 30px -20px rgba(0, 0, 0, 0.75);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
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



