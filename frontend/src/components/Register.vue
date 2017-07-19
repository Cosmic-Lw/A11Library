<template>
<div>
    <h1> 注册 </h1>
    <div> 用户名： <Input v-model="username" placeholder="请输入..." type = "text" style="width: 300px"></Input> </div>
    <div> 密码：   <Input v-model="password" placeholder="请输入..." type = "password" style="width: 300px"></Input> </div>
    <div> <Button type="primary" @click = "register"> 注册 </Button> </div>
</div>
</template>
<script>

export default{
    data(){
        return{
            username: '123',
            password: '123'
        }
    },
    methods: {

    }
}
</script>
<style scoped>
</style>