<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h1>{{title}}</h1>
    <h1>{{description}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
async function ceshi(next) {
  try {
    var res = await axios.get('/api/Starter')
    console.log("测试数据"+res)
    console.log(res)
    if(res.status===200||304){
      next(vm => {
        vm.title = res.data.title
        vm.description = res.data.description
      })
    }else{
      next(vm => {
        vm.title = "出现一些神奇的错误"
        vm.description = res.statusText
      })
    }
  } catch (error) {
      next(vm => {
        vm.title = "出现了一个异常"
        vm.description = error
      })
  }
}
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 6666,
      description: 6666
    }
  },
  created:function(){
      ceshi((func) => func(this))
  },
    async beforeRouteEnter(to, from, next) {
    // 用户单击其他页面中的某个链接进入此页面，这个函数会保证在显示页面之前先加载页面中的信息
    // 加载时会显示 Loading Bar，因此用户不会认为页面卡了
    ceshi(next)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
