<template>
   <div id="particles-js"></div>
   <div class="login_box">
            <img class="logo" src="../assets/everything.svg" alt="">
            <h1 class="before_title">LOGIN</h1>
            <h1 class="after_title">LOGIN</h1>
            <div class="form">
                <form action="">
                    <div class="input_box">
                        <img src="../assets/account.svg" alt="">
                        <input type="text" placeholder="请输入账户" @blur="verifyAccount" v-model="formModel.account.value" id="account">
                        <span v-show="formModel.account.error">请输入账户</span>
                    </div>
                    <div class="input_box">
                        <img src="../assets/password.svg" alt="">
                        <input type="password" placeholder="亲输入密码" @blur="verifyPassword" v-model="formModel.password.value" id="password">
                        <span v-show="formModel.password.error">请输入密码</span>
                    </div>
                    <div class="btn_box">
                        <button type="button" @click="login">登录</button>
                    </div>
                </form>
            </div>
    </div>
    <div class="verify" v-if="showCode">
        <my-verify @success="verifyLogin"></my-verify>
    </div>
</template>

<script setup lang="ts">
import { onMounted,onBeforeUnmount,ref,reactive } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import MyVerify from './components/MyVerify.vue'
import { useRoute } from 'vue-router'

const route=useRoute()
const script=ref()
const script2=ref()
const showCode=ref(false)
const formModel=reactive({
  account:{
    value:'',
    error:false
  },
  password:{
    value:'',
    error:false
  }
})

function verifyAccount(){
  if(formModel.account.value){
    formModel.account.error=false
    return true
  }else{
    formModel.account.error=true
    return false
  }
}

function verifyPassword(){
  if(formModel.password.value){
    formModel.password.error=false
    return true
  }else{
    formModel.password.error=true
    return false
  }
}

onMounted(()=>{
  script.value=document.createElement('script')
  script2.value=document.createElement('script')
  script.value.src='/particles/particles.js'
  document.body.appendChild(script.value)
  script.value.onload=()=>{
    script2.value.src='/particles/app.js'
    document.body.appendChild(script2.value)
  } 

})

onBeforeUnmount(()=>{
  document.body.removeChild(script.value)
  document.body.removeChild(script.value)
})

function login(){
  if(!(verifyAccount()&&verifyPassword())){
    return
  }
  showCode.value=true
}

async function verifyLogin(){
  showCode.value=false
  let body={
    account:formModel.account.value,
    password:formModel.password.value
  }

  let response=await axios('http://admin.linqiaoyan.top/login',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    data:body
  })

  if(response.data.code===200){
    Toastify({
      text:'登陆成功',
      position:'center',
      style:{
        background:'#12aa9c'
      }
    }).showToast()
    localStorage.setItem('token',response.data.data)
    location.href=`${route.query.redirceUrl}`
  }else{
    Toastify({
      text:'账号或者密码有误',
      position:'center',
      style:{
        background:'#954416'
      }
    }).showToast()
  }
}

</script>

<style lang="scss" scoped>
body{
    margin:0;
    padding:0;
    overflow:hidden;
    background:rgb(29,32,37)
}

#particles-js{
    width: 100vw;
    height: 100vh;
}

.login_box{
    position:absolute;
    z-index:100;
    top:200px;
    left:50%;
    transform:translateX(-50%);
    width:350px;
    height:250px;
    background:rgb(29,32,37);
    padding:15px;
    border-radius:4px;
    .form{
        margin-top: -20px;
        .input_box{
            margin-bottom: 20px;
            position: relative;
            img{
                position: absolute;
                top: 7px;
                left: 37px;
                width: 20px;
                height: 20px;
            }
            input{
                height: 30px;
                width: 250px;
                border:none;
                border-radius: 5px;
                outline: none;
                border: 1px solid rgba(255, 255, 255, 0.117);
                background-color: transparent;
                padding-left: 30px;
                &:focus{
                    outline:1px solid #12aa9c;
                }
            }
            span{
                font-size: 7px;
                position: absolute;
                top: 32px;
                left: 40px;
            }
        }
        .btn_box{
            button{
                width: 200px;
                outline: none;
                &:hover{
                    border:1px solid #12aa9c;
                }
            }
        }
    }
}

.verify{
    background-color: white;
    width: 350px;
    height: 250px;
    padding:15px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%);
    z-index: 100;
}

.login_box .logo{
    position:absolute;
    top:5px;
    left:50%;
    transform:translateX(-50%);
    width:50px;
    height:50px;
}

.login_box .before_title{
    margin-top:25px;
    color:#12aa9c;
    text-align:center;
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    clip-path: circle(40% at 0px);
    animation:circleGo 4s linear infinite
}

.login_box .after_title{
    margin-top:25px;
    color:#7a7374;
    text-align:center;
}

@keyframes circleGo{
    50%{
        clip-path: circle(40% at 130px);  
    }
}


</style>