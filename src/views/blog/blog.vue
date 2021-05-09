<template>
    <el-main>
        <el-row>
            <el-col :span="12">
                <div class="title">发现</div>
                <div v-if="blogList.length">
                    <div v-for="blog in blogList" :key="blog.id" class="blog" @click="blogDetail(blog.id)">
                        <div class="headline">{{ blog.headline }}</div>
                        <div class="abstract">{{ blog.abstract }}</div>
                        <div class="author">作者:{{ blog.author.nickname }}</div>
                        <div class="pub">{{ blog.pub_time }}</div>
                    </div>
                </div>
                <div v-else class="no-blog">
                    <div>空空如也~</div>
                    <div class="create" @click="write">来写博客吧</div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="title">关注</div>
                <div v-if="friendBlogList.length">
                    <div v-for="blog in friendBlogList" :key="blog.id" class="blog" @click="blogDetail(blog.id)">
                        <div class="headline">{{ blog.headline }}</div>
                        <div class="abstract">{{ blog.abstract }}</div>
                        <div class="author">作者:{{ blog.author.nickname }}</div>
                        <div class="pub">{{ blog.pub_time }}</div>
                    </div>
                </div>
                <div v-else class="no-blog">
                    <div>空空如也~</div>
                </div>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
// import func from 'vue-editor-bridge';
export default {
  name: "Blog",
  data() {
    return {
      blogList: [],
      friendBlogList:[],
    };
  },
  created() {
    var that = this;
    this.$axios.get("/api/blog/blog")
    .then((res)=> {
        console.log(res.data)
      that.blogList = res.data;
    }).catch((err)=>{
        console.log(err.response)
    });
    this.$axios.post("/api/blog/blog/friend",{
        token:this.$store.state.token,
    })
    .then((res)=> {
        console.log(res.data)
      that.friendBlogList = res.data;
    }).catch((err)=>{
        console.log(err.response)
    });
  },
  methods:{
      blogDetail:function (id) {
          this.$store.commit("set_temp_blog_id",id)
          this.$router.push("/article")
      },
      write:function () {
          this.$router.push("/write")
      }
  }
};
</script>

<style scoped>
div.title{
    font-size: 2rem;
    font-weight: 600;
    border-bottom: 2px solid;
    margin-left: 2rem;
    padding-bottom: 1rem;
    padding-right: 0.5rem;
}

.blog{
    border: 1px solid rgba(96, 96, 96, 0.4);
    margin-left: 2rem;
    margin-top: 0.5rem;
    margin-right: 10rem;
    border-radius: 0.8rem;
    padding:0.5rem;
    box-shadow: 11px 10px 30px -20px rgba(0,0,0,0.75);
}

.blog:hover{
    /* border: 1px solid; */
    cursor: pointer;
    background: #888c;
    opacity: 0.5;
}

.blog .headline{
    font-size: 1.25rem;
    font-weight: 575;
    border-bottom: 1px solid;
    margin-right: 70%;
}

.blog .abstract{
    margin-top: 0.5rem;
    margin-left: 1rem;
}

.blog .author,.blog .pub{
    font-size: 0.8rem;
    text-align: right;
    margin-top: 0.3rem;
}

.no-blog{
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 2rem;
    margin-top: 0.5rem;
    margin-right: 80%;
}

.create{
    text-decoration: underline;
    margin-top: 0.3rem;
}

.create:hover{
    cursor: pointer;
    color: blue;
}
</style>