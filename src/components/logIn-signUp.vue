<script setup>
import {ref , onMounted } from 'vue'
import db from "../firebase/init.js"
import { collection, addDoc , getDocs , query } from 'firebase/firestore'
import { useRouter } from 'vue-router';
const rount = useRouter();
let userArr = ref([])
let status = ref(false)
let statusLogOut = ref(localStorage.getItem("username") == null)
let color = ref()
let username = ref('')
let password = ref ('')
let clickSignup = ()=>{
    if(status.value == false){
        status.value = true;
        if(localStorage.getItem("username") == null){
        statusLogOut.value = true
    }
    else{
        statusLogOut.value = false
    }
    }
    else{
        status.value = false;
    }
}

let logout = ()=>{
    localStorage.clear()
    rount.go()
    
}

let statusLogin = ref(false)
let validateUser = ()=>{
    for(let i =0 ; i < userArr.value.length ; i++){
        if(userArr.value[i].users.username == username.value && userArr.value[i].users.password == password.value){
            getUser()
            localStorage.setItem("username", username.value);
            localStorage.setItem("password", password.value);
            localStorage.setItem("color" , userArr.value[i].color)
            alert("Login success")
             username.value = ''
             password.value = ''
             statusLogin.value = true
             rount.go()
            break;
        }
        else{
            statusLogin.value = false
        }
        }
      if(statusLogin.value == false){
        alert("username or password invalid or Sign Up user !!")    
      }
    }
async function createUser(){
    const collRef = collection(db,"users" )
    const docRef = await addDoc(collRef,{
      color: [color.value],
      users: {
        username : username.value ,
        password : password.value 
      }
    })

    alert("Create User Success")
    status.value = false;
    username.value = ''
    password.value = ''
    color.value = ''
    rount.go()
  }

  async function getUser(){
    const querySnap = await getDocs(query(collection(db,'users')))
    userArr.value = []
    querySnap.forEach( (doc) => {
      let data = doc.data() 
      data.id = doc.id 
      userArr.value.push(data)
    })
  }
  onMounted(()=>
    getUser()
  )


</script>

<template>
<div class="container">
  <div class="div-logout">
    <button class="button-logout" v-show="statusLogOut == false" @click="logout">Log out</button>
  </div>
    <div class="card-login" v-show="status == false && statusLogOut == true">
        <h1 class="title-login">Login</h1>
        <label class="label-username" for="input-username">username: </label>
        <input id="input-username" type="text" placeholder="input username here" v-model="username">
        <label class="label-password" for="input-password">password: </label>
        <input id="input-password" type="password" placeholder="input password here" v-model="password">
        <button class="login" @click="validateUser">LOG IN</button>
        <h1 class="sign-up" @click="clickSignup">SIGN UP</h1>
    </div>
    <div class="card-signup" v-show="status == true ">
        <h1 class="cancel" @click="clickSignup">X</h1>
        <h1 class="title-signup">SIGN UP</h1>
        <label class="label-username-signup" for="input-username-signup">username: </label>
        <input  id="input-username-signup" type="text" placeholder="input username here" v-model="username">
        <label class="label-password-signup" for="input-password-signup" >password: </label>
        <input id="input-password-signup" type="password" placeholder="input password here" v-model="password">
        <label for="color-green">Green</label>
        <input type="radio" id="color-green" name="color" value="green" v-model="color"> 
        <label for="color-red">Red</label>
        <input type="radio" id="color-red" name="color" value="red" v-model="color"> 
        <button class="login-signup" @click="createUser">SIGN UP</button>
    </div>
</div>
</template>

<style >
.div-logout{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(3 , auto);
    height: 150px;
    width: 100%;
    padding: 0 20px 0 0;
}
.button-logout{
 background-color: white;
 color: black;
 grid-row-start: 2;
 grid-column-start: 1;
 justify-self: end;
}
.login-signup , .button-logout{
    cursor: pointer;
}
.button-logout:hover{
    background-color: gray;
    color: white;
}
.login-signup:hover{
    background-color: gray;
    color: white;
}
#color-green , #color-red{
    justify-self: start;
}
#input-username-signup , #input-password-signup , .login-signup{
    background-color: white;
    height: 50px ;
    width:  600px;
}
#input-username-signup , #input-password-signup::placeholder , #input-username , #input-password {
    padding: 0 0 0 5px;
}
.cancel{
    padding: 5px 5px 0 0;
    cursor: pointer;
    grid-row-start: 1;
    justify-self: end;
}
.title-signup{
    font-size: 40px;
    justify-self: center;
    grid-row-start: 2;
}
.label-username-signup{
    grid-row-start: 3;
}
#input-username-signup{
    grid-row-start: 4;
    color: black;
}
.label-password-signup{
    grid-row-start: 5 ;
}
#input-password-signup{
    color: black;
}
.login-signup{
    color: black;
    grid-row-start: 12;
    width: 20%;
    height: 50px;
    justify-self: center;
}

.card-signup{
    padding: 10px 10px 10px 10px;
    position: absolute;
    display: grid;
    grid-template-columns: auto ;
    grid-template-rows: repeat(8 , auto);
    width: 40%;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    row-gap: 10px;
}

*{
    border-radius: 15px;
}
.login , .button-logout{
    background-color: white;
    color: black;
    cursor: pointer;
    width: 100px;
    height: 40px;
}
.login:hover{
    background-color: gray;
    color: white;
}
.sign-up{
    cursor: pointer;
    font-size: 15px;
}
.card-login{
    position: absolute;
    display: grid;
    grid-template-columns: auto ;
    grid-template-rows: repeat(7 , auto);
    height: auto;
    justify-items: center;
    align-self: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    row-gap: 10px;
}
.title-login{
    font-size: 40px;
    grid-row: 1;
}
#input-username , #input-password{
    height: 50px ;
    width:  600px;
    background-color: white;
    color: black;
}
.label-username{
    grid-row: 2;
    grid-column: 1;
    justify-self: start;
}
.label-password{
    grid-row: 4;
    grid-column: 1;
    justify-self: start;
}

</style>
