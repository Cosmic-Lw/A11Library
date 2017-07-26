<template>
    <div>
        <button @click = 'sendMail()'>你好啊</button>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    name: 'email',
    data () {
        return {
            email: '18829589407@163.com'
        }
    },
    methods: {
        sendMail: function(){
            var res = axios.post('/api/sendMail', {
                useremail: this.email
            })
            console.log(res)
        }
    }
}    
</script>