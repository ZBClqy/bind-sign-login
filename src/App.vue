<script setup lang="ts">
import { onMounted } from 'vue'
import {useRouter } from 'vue-router'

const router=useRouter()

onMounted(()=>{

  if(localStorage.getItem('token')){

    if(location.search.indexOf('?redirceUrl=')==-1){
      router.push('/error')
    }else{
      console.log('发送token')
      setTimeout(()=>{
        try{
          window.parent.postMessage(localStorage.getItem('token'),document.referrer)
        }catch(err){/** */}
      },500)
     
    }
  }else{
    if(location.search.indexOf('?redirceUrl=')!=-1){
      router.push({path:'/login',query:{redirceUrl:location.search.replace('?redirceUrl=','')}})
      if(self.location==top?.location){
        setTimeout(()=>{
          window.parent.postMessage(localStorage.getItem('token'),document.referrer)
        },500)
      }
      
    }else{
      router.push('/error')
    } 
  }
})

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
