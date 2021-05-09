<template>
  <el-main>
    <div class="container">
      <div class="upload">
        <el-input v-model="fileData.name" placeholder="文件名称"></el-input>
        <el-input
          v-model="fileData.password"
          placeholder="密码(可选)"
        ></el-input>
        <el-upload
          ref="upload"
          class="upload"
          action="http://127.0.0.1:8000/api/tools/files/"
          :data="fileData"
          :auto-upload="false"
          :on-success="onSuccess"
          style="padding: 30px"
        >
          <el-button class="el-upload__text">文件分享</el-button>
        </el-upload>
        <div class="file-submit">
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </div>
        <div class="info">
          <div class="fid" v-if="fid">文件提取id:{{ fid }}</div>
        </div>
      </div>
      <div class="download">
        <el-input v-model="downloadcode" placeholder="文件提取码"></el-input>
        <div style="display:none">{{downloadCheck}}</div>
        <el-input v-model="downloadpassword" placeholder="文件提取密码"></el-input>
        <div class="download-file" v-if="downloadcode.length">
          <el-button size="small" type="primary"
            ><a :href="downloadHref" style="color: #fff">
              文件下载</a
            ></el-button
          >
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "FileShare",
  data() {
    return {
      fid: 0,
      downloadcode: "",
      downloadpassword:"",
      fileData: {
        name: "",
        password: "",
      },
    };
  },
  computed: {
    downloadCheck() {
      if (this.downloadcode == ""){
        return null
      }
      var url = "http://127.0.0.1:8000/api/tools/download/" + this.downloadcode
      status=this.checkFile(url)
      return url;
    },
    downloadHref(){
      return "http://127.0.0.1:8000/api/tools/download/" + this.downloadcode+"?password="+this.downloadpassword
    }
  },
  methods: {
    checkFile(url){
      this.$axios
      .get(url)
      .then((res) => {
        return true
      })
      .catch((err) => {
        this.$notify.error({
          title: err.response.data.detail,
        });
      });

    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSuccess(response, file, fileList) {
      this.$message.success("上传成功");
      this.fid = response.id;
      this.$refs.upload.clearFiles();
      this.fileData.name = "";
      this.fileData.password = "";
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: 20%;
  margin-right: 20%;
}

.el-input {
  margin-bottom: 1rem;
}

.el-upload .el-button {
  margin-left: 17rem;
}

div.file-submit {
  padding-bottom: 2rem;
  border-bottom: 2px solid;
}

div.info {
  text-align: center;
}
</style>