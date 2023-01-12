<template>
    <slide-verify sliderText="滑动进行人机验证" @success="OnSuccess" @fail="OnFail" :imgs="imgs" :show="showCode"></slide-verify>
</template>

<script setup lang="ts">
import SlideVerify from 'vue3-slide-verify'
import {ref,reactive } from 'vue'
import 'vue3-slide-verify/dist/style.css'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const showCode=ref(true)
const imgs=reactive([
  '/imgs/cyberpunk.png'
])
const emit=defineEmits(['success'])

function OnSuccess(){
  Toastify({
    text:'验证通过',
    position:'center',
    style:{
      background:'#12aa9c'
    }
  }).showToast()
  emit('success')
}

function OnFail(){
  Toastify({
    text:'验证失败，请重试！',
    position:'center',
    style:{
      background:'#954416'
    }
  }).showToast()
}

</script>

<style lang="scss" scoped>

</style>