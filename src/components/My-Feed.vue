<script setup>
import {ref , onBeforeMount, computed} from 'vue'
import { getDocs , query , collection , where , doc , deleteDoc  , updateDoc , onSnapshot } from '@firebase/firestore';
import db from "../firebase/init.js"
import { useRouter } from 'vue-router';
let myFeedArr = ref([])
let idUser = ref([])
let username = ref(localStorage.getItem("username"))
let userLike = ref([])
let userDisLike = ref([])
let toggleLike = ref(true)
let toggleDisLike = ref(true)
async function likeUpdate( id , index){
        if(toggleLike.value == true ){
        userLike.value.push(username.value)
        const cardRef = collection(db, "cards");
        console.log(cardRef);
        await updateDoc(doc(cardRef , id) , {
         like : myFeedArr.value[index].like + 1,
         likeArr : userLike.value,
     });
     toggleLike.value = false;
     console.log(toggleLike.value);
        }
        else {
        console.log(2);
        let arr = userLike.value.filter((e)=> e != username.value)
        userLike.value = []
        console.log(arr);
        const cardRef = collection(db, "cards");
        console.log(cardRef);
        await updateDoc(doc(cardRef , id) , {
         like : myFeedArr.value[index].like - 1 ,
         likeArr : userLike.value
     });
     toggleLike.value = true
        }
    }
    
    async function DislikeUpdate( id , index){
        if(toggleDisLike.value == true ){
        userDisLike.value.push(username.value)
        const cardRef = collection(db, "cards");
        console.log(cardRef);
        await updateDoc(doc(cardRef , id) , {
         dislike : myFeedArr.value[index].dislike + 1,
         dislikeArr : userDisLike.value,
     });
     toggleDisLike.value = false;
        }
        else {
        console.log(2);
        let arr = userDisLike.value.filter((e)=> e != username.value)
        userDisLike.value = []
        console.log(arr);
        const cardRef = collection(db, "cards");
        console.log(cardRef);
        await updateDoc(doc(cardRef , id) , {
        dislike : myFeedArr.value[index].dislike - 1 ,
        dislikeArr : userDisLike.value
     });
     toggleDisLike.value = true;
        }
    }
const dateTimeFormat = new Intl.DateTimeFormat('en-US');
async function getMyFeed(){
    const collRefUser = query(collection(db , "users"), where("users.username" , "==" , localStorage.getItem("username")))
    const docCollUser = await getDocs(collRefUser)
    docCollUser.forEach( (doc) => {
      let data = doc.data() 
      data.id = doc.id 
      idUser.value.push(data.id)
    })
    console.log(idUser.value[0]);
    const querySnap = query(collection(db,"cards") , where("user" , "==" , idUser.value[0]))
    const unsubscribe = onSnapshot(querySnap, (querySnapshot)=>{
        myFeedArr.value = []
        querySnapshot.forEach( (doc) => {
      let data = doc.data() 
      data.id = doc.id 
      const formattedDateTime = dateTimeFormat.format((doc.data().time.seconds * 1000) + (doc.data().time.nanoseconds / 1000000000));
      data.time = formattedDateTime
      myFeedArr.value.push(data)
    })
    })
   
}

async function deleteMyFeed(index){
    const doc_id = myFeedArr.value[index].id
    const colRef = doc(db,"cards",doc_id)
    await deleteDoc(colRef)
    myFeedArr.value.splice(0 , myFeedArr.value.length)
    getMyFeed()
    alert("delete success")
    
  }
let cardInput = ref('')
  async function editMyCard(id){
        const cardRef = collection(db, "cards");
        await updateDoc(doc(cardRef , id) , {
         card : cardInput.value
     });
}
let editTog = ref(false)

let switchEditTog = ()=>{
    if(editTog.value == false){
        editTog.value = true
    }
    else{
        editTog.value = false
    }
} 
onBeforeMount(()=>{
    getMyFeed()
}
)

</script>

<template>
        <div class="card-myFeed">
            <h1 class="title-mff">MyFeed</h1>
                <div class="card-container" v-show="myFeedArr.length > 0">
                     <div class="to" v-show="editTog == true" >
                    <div class="k">
                        <input type="text" name="" id="" class="editCardInput" placeholder="input-card" v-model="cardInput">
                        <button class="s" @click="editMyCard(myfeed.id)">submit</button>
                     </div>
                 </div>
                    <div class="con">
                <div class="my-feed-loop" v-for=" (myfeed , index) in myFeedArr" :key="index">
                 <div class="content">
                    <h4 class="username-mf"> username : {{username}}</h4>
                    <h4 v-if="myfeed.timeChristmasDay == false" style="color: red;"   class="time-mf">{{myfeed.time}}</h4>
                    <h4 v-else style="color: green;"   class="time-mf">{{myfeed.time}}</h4>
                    <h4 class="card-mf">card : {{myfeed.card}}</h4>
                     <img class="imgContent" id="like-m" src="/like.png" alt="like-m" @click="likeUpdate(myfeed.id , index)">
                     <h5 class="like-mf">{{myfeed.like}}</h5>
                     <img class="imgContent" src="/dislike.png" id="dislike-m" alt="dislike" @click="DislikeUpdate(myfeed.id , index)">
                     <h5 class="dislike-mf">{{myfeed.dislike}}</h5>
                     <img class="imgContent" src="/edit.png" alt="edit" id="edit-m" @click="switchEditTog">
                     <img class="imgContent" src="/trash.png" alt="trash" id="remove-m" @click="deleteMyFeed(index)">
                     <hr class="hr-end">
                 </div>
            </div>
        </div>
                </div>
            </div>
</template>

<style>
.k{
    padding-bottom: 20px;
}
.s{
    cursor: pointer;
    position: absolute;
    top: -1px;
    left: 610px;
    height: 35px;
    width: 70px;
    background-color: white;
    color: black;
}
.editCardInput{
    width: 600px;
    background-color: white;
    color: black;
    height: 30px;
}
.editCardInput::placeholder{
    padding: 0 0 0 20px;
}
.card-container{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 40%);
    width: 80%;
    height: 500px;
    overflow-y: scroll;
}

.hr-end{
    grid-area: 4 / 1 / span 1 / span 10;
    margin-top: 20px;
}
.time-mf{
    grid-area: 2 / 2 / span 1 / span 2;
}
.username-mf{
    grid-area: 2 / 1 / span 1 / span 2;
}
.card-mf{
    grid-area: 3 / 1;
}

#like-m{
    grid-area: 3 / 4;
    align-self: flex-end;
}
.like-mf{
    grid-area: 3 / 4;
    justify-self: center; 
    align-self: flex-end;

}
#dislike-m{
    grid-area: 3 / 5;
    align-self: flex-end;
}
.dislike-mf{
    grid-area: 3 / 5;
    justify-self: center; 
    align-self: flex-end;
}

#edit-m{
    grid-area: 3/ 6;
    align-self: flex-end;
}
#remove-m{
    grid-area: 3 / 6;
    justify-self: center; 
    align-self: flex-end;
}


.con{
    transform: translate(30%, 0%);
    width: 30%;
    height: 500px;


}
.title-mff{
    width: 100%;
    position: absolute;
    left: 50%;
    top: 18%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 40px;
}
.content{
    display: grid;
    grid-template-columns: repeat(6, 45%);
    grid-template-rows: repeat(3, 1fr);
    width: 100%;
}
 .imgContent{
    
    width: 32px;
    height: 29px;
    cursor: pointer;
 }

 /* width */
::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(139, 136, 136); 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ffffff; 
}
</style>