<template>
  <el-main>
    <div class="container">
      <div class="title">工具栏</div>
      <div class="tools">
        <div class="tool" v-for="tool in toolList" :key="tool.id" @click="toolDetail(tool.url)">
          <div class="name">{{ tool.name }}</div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "Tools",
  data() {
    return {
      toolList: [],
    };
  },
  created() {
    var that = this;
    this.$axios.get("/api/tools/tools").then(function (response) {
      console.log(response.data);
      that.toolList = response.data;
    });
  },
  methods: {
    toolDetail(url){
        this.$router.push('/'+url);
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

.tools{
    margin-left: 20%;
    margin-right: 20%;
}

.tool {
  margin-top: 2rem;
  margin-left: 2rem;
  border-left: 4px solid;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  box-shadow: 11px 10px 30px -20px rgba(0, 0, 0, 0.75);
}

.tool:hover {
  cursor: pointer;
  border-left: 4px solid #f45e61;
  transition: 0.2s;
}
</style>