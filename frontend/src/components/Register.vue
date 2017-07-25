<template>
<div>
    <h1> 注册 </h1>
    <div> 用户名： <Input v-model="username" placeholder="请输入..." type = "text" style="width: 300px"></Input> </div>
    <div> 密码：   <Input v-model="password" placeholder="请输入..." type = "password" style="width: 300px" on-change = "tongbu"></Input> </div>
    <div> 确认密码：   <Input v-model="repeatpassword" placeholder="请输入..." type = "password" style="width: 300px" on-change = "tongbu"></Input> </div>
    <div> <Button type="primary" @click = "register"> 注册 </Button> </div>
</div>
</template>
<script>
import axios from 'axios'
async function registeraccount(self){
    try {
        var res = await axios.post('/users/register',{
            username: self.username,
            password: self.password
        }); 
    } catch (error) {
        console.log(error)
    }
}
export default{
    data(){
        return{
            username: '123',
            password: '123',
            repeatpassword: '',
            cuowuxianshi: false
        }
    },
    methods: {
        register: function(){
            if(this.username==''){
                console.log("你没有输入账户")
                return;
            }
            if(this.password==''){
                console.log("你没有输入密码")
                return;
            }
            registeraccount(this)
        },
        tongbu: function(){
            if(this.repeatpassword == this.password){
                this.cuowuxianshi = false
            }
        }
    }
}
</script>
<style scoped>
</style>