<template>
<div>
{{items}}
        {{id}}
        {{content}}
</div>
</template>
<script>
import axios from 'axios'
async function ceshishujuku(next){
    try{
        var res = await axios.get('/api/ceshishujuku')
        console.log(res.data)
        if(res.status===200||304){
        next(vm => {
            vm.items = res.data
            vm.id = "123"
            vm.ceshi = "789"
      })
    }else{
      next(vm => {
          vm.id = "123"
          vm.ceshi = "789"
      })
    }
    }catch (error) {
      next(vm => {
        vm.id = "出现了一个异常"
        vm.content = error
    })
    }
}
export default{
     name:'ceshi',
     data (){
         return{
        items: null,
        id:1,
        content: null
     }
    },
  created:function(){
      ceshishujuku((func) => func(this))
  },
    async beforeRouteEnter(to, from, next) {
    // 用户单击其他页面中的某个链接进入此页面，这个函数会保证在显示页面之前先加载页面中的信息
    // 加载时会显示 Loading Bar，因此用户不会认为页面卡了
    ceshishujuku(next)
  }
}
</script>
<style>
</style>
