<template>
<div>
    <div>
    账户： <Input id="userName" placeholder="请输入..." style="width: 300px" v-model="username"></Input>
    </div>
    <div>
    密码： <Input id="password" v-model="password" type="password" placeholder="请输入..." style="width: 300px"></Input>
    </div>
    <Button type="primary" @click = "login">提交</Button>
</div>
</template>

<script>
import axios from 'axios'
async function loginuser(self){
    try{
        if(self.username == ""){
            console.log("用户名不能为空");
            return;
        }
        if(self.password == ""){
            console.log("密码不能为空")
            return;
        }
        var res = await axios.post('/user/login',{
            username: self.username,
            password: self.password
        });
        if(res.logined == 1){
           self.$router.push({ path: '/' }) 
        }
    }catch(err){
        self.error = err.data || "登录出错请重试"
    }
}

export default{
    name: 'Login',
    data () {
        return{
            username: '123',
            password: '123',
            error: ''
        }
    },
    methods: {
        login: function () {
            console.log(1322);
            console.log("用户名: "+ this.username);
            console.log("密码: " + this.password);
            loginuser(this);
        }
    }
}
</script>
<style>
</style>