<script setup>
import {RouterLink , RouterView} from 'vue-router'
import {ref , onMounted} from 'vue'
let nameLogin = ref('')
let color = ref(`color: ${localStorage.getItem("color")}`)
let username = localStorage.getItem("username")
console.log(color.value);
let checkNameLogin = ()=>{
  if(localStorage.getItem("username") == null){
    nameLogin.value = "LogIn"
  }
  else{
    nameLogin.value = localStorage.getItem("username")
  }
}
onMounted(()=>{
  checkNameLogin()
})

function changeColor() {
document.getElementById("user-color").style.color = localStorage.getItem("color");
}
onMounted(()=>{
  changeColor()
})



</script>

<template>
<div class="container">
    <header>
  <nav>
    <router-link to="/" active-class="router-link-active" class="menus" >Home</router-link>
    <router-link v-if="username !=null" to="/review-web" active-class="router-link-active"  class="menus">Review web</router-link>
    <router-link v-if="username !=null" to="/my-feed" active-class="router-link-active" class="menus">My Feed</router-link>
    <router-link v-if="username !=null" to="/feed" active-class="router-link-active" class="menus">Feed</router-link>
    <router-link to="/login" class="menus" id="user-color">{{nameLogin}}</router-link>
  </nav>
  <router-view></router-view>
    </header>
</div>
</template>

<style >
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #252A3E;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
 
}

.router-link-active {
  color: rgb(177, 241, 165);
  font-weight: bold;
  text-decoration: underline;
}


</style>
