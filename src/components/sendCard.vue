<script setup>
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import {ref } from 'vue'
import db from "../firebase/init.js"
let comment = ref('')
let timeChristmasDay = ref(false)
let localStorageU = localStorage.getItem("username")
let dataIdArr =ref([])
let date = new Date()
async function createCard(){  
  if(date.getDay == 25 && date.getMonth == 12){
    timeChristmasDay.value = true
  }
  else{
    timeChristmasDay.value = false
  }
    const collRef = collection(db,"cards")
    const collRefUser = query(collection(db , "users"), where("users.username" , "==" , localStorage.getItem("username")))
    const docCollUser = await getDocs(collRefUser)
    docCollUser.forEach((doc)=>{
       let data = doc.data 
       data.id = doc.id
        dataIdArr.value.push(data.id)
    })
    
    const docRef = await addDoc(collRef,{
      card: comment.value,
      dislike: 0 ,
      like : 0 ,
      likeArr : [] ,
      dislikeArr : [] ,
      time : new Date() ,
      timeChristmasDay : timeChristmasDay.value ,
      user : dataIdArr.value[0]
    })
    alert("Create Card")
    comment.value = ''
    }
  
</script>

<template>
<div class="container">
    <div class="snow">
        <img src="/snow.png" alt="snow-1" class="snow" id="snow-1">
        <img src="/snow.png" alt="snow-2" class="snow" id="snow-2">
        <img src="/snow.png" alt="snow-3" class="snow" id="snow-3">
        <img src="/snow.png" alt="snow-4" class="snow" id="snow-4">
        <img src="/snow.png" alt="snow-5" class="snow" id="snow-5">
        <img src="/snow.png" alt="snow-6" class="snow" id="snow-6">
    </div>

    <div class="card-title">
      <h1 class="title">Christmas Card</h1>
    </div>
    <div class="card">
      <h5>{{comment.length}}/60</h5>
      <label class="label-card" for="comment-card">Merry Christmas Card : </label>
      <input v-model="comment" class="input-card" type="text" id="comment-card" placeholder="show your greetings" maxlength="60">
      <button v-if="localStorageU != null && comment.length > 0" class="submit-card" @click="createCard">Send</button>
      <h1 v-else-if="localStorageU !=null && comment.length <= 0" class="submit-cardE" >Please input card 🎅🤶🧑‍🎄</h1>
      <h1 v-else-if="localStorageU ==null " class="submit-cardE" >Please Login user 🎅🤶🧑‍🎄</h1>
    </div>
    <div class="mascot">
      <img src="/santa.png" alt="santa" class="santa">
    </div>
</div>
</template>

<style >
 *{
  color: white;
 }
 
 .label-card , .input-card , .submit-card{
  color: white;
  }
  .input-card{
  grid-row-start: 2;
  width: 500px;
  height: 40px;
  font-size: 18px;
  padding: 10px;
  border: 2px solid #333;
  background-color: white;
  border-radius: 15px;
  color: black;
  
  }
  .label-card{
    text-align: end;
    font-size: 30px;
    grid-row-start: 2;
  }
  h5{
    grid-row-start: 1;
    grid-column-start: 10;
    text-align: end;
  }
  .submit-card {
    grid-row-start: 3;
    grid-column-start: 2;
    cursor: pointer;
    width: 100px;
    height: 40px;
    background-color: white;
    color: black;
    border-radius: 15px;
    justify-self: start;
  }
  .submit-cardE{
    grid-row-start: 3;
    grid-column-start: 2;
    width: 100px;
    height: 40px;
    color: rgb(255, 255, 255);
    width: 300px;
    justify-self: end;
    
  }

  .card{
    column-gap: 10px;
    row-gap: 10px;
    position: absolute;
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns:  50% 50%;
    left: 60%;
    top: 65%;
    transform: translate(-50%, -50%);

  }
  .submit-card:hover{
    background-color: gray;
    color: white;
    
  }

.title{
  font-size: 250%;
  position: absolute;
  left: 65%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;

}
.santa{
  position: absolute;
  bottom: 0;
  height: 60%;
  padding-bottom: 2%;
}
.snow{
  width: 30px;
 height: 25px;
}
#snow-1 , #snow-2 , #snow-3 , #snow-4 , #snow-5 , #snow-6{
  position: absolute;
  animation: moveUpDown 3s infinite;
}

#snow-1{
  left: 5%;
top: 8%;
}
#snow-2{
  left: 20%;
top: 23%;
}
#snow-3{
  left: 40%;
top: 13%;
}
#snow-4{
  left: 65%;
top: 30%;
}
#snow-5{
  left: 81%;
top: 15%;
}
#snow-6{
  left: 95%;
top: 31%;
}
.menu{
  text-decoration: none;
  color: white;
}
nav{
  padding-right: 200px;
  float: right;
  display: grid;
  grid-template-columns: repeat(5, auto);
  column-gap: 25px;
  text-align: center;
  padding: 10px 20px 0 0;
  }

  @keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
