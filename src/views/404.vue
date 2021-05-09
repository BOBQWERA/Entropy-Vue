<template>
    <el-main>
        <div class="message-box">
        <span class="text">对不起</span>
        <br>
        <span class="text">您所访问的页面没有找到哦</span></div>
    </el-main>
</template>

<style scoped>
.el-main .message-box{
    position: absolute;
    margin-left: 50%;
    margin-top: 50%;
    transform: translate(-50%,-50%);
}

.el-main .text{
    text-align: center;
}
</style>