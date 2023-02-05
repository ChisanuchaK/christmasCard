<script setup>
import {ref , onBeforeMount, computed} from 'vue'
import { getDocs , query , collection , where , doc , deleteDoc  , updateDoc , onSnapshot , addDoc } from '@firebase/firestore';
import db from "../firebase/init.js"
import { useRouter } from 'vue-router';
const rount = useRouter()
let date = ref(new Date())
let review = ref("")
let score = ref(0)
let reviewArr = ref([])

async function addReview(e){
    e.preventDefault()
    const add = await addDoc(collection(db , 'reviews'),{
        review : review.value ,
        score: score.value , 
        time : date.value ,
        user : localStorage.getItem("username") ,
    });
    rount.go()
}
const dateTimeFormat = new Intl.DateTimeFormat('en-US');
async function getReview(){
    const querySnap = query(collection(db,"reviews"))
    const unsubscribe = onSnapshot(querySnap, (querySnapshot)=>{
        reviewArr.value = []
        querySnapshot.forEach( (doc) => {
      let data = doc.data() 
      data.id = doc.id 
      const formattedDateTime = dateTimeFormat.format((doc.data().time.seconds * 1000) + (doc.data().time.nanoseconds / 1000000000));
      data.time = formattedDateTime
      reviewArr.value.push(data)
    })
    })
}
console.log(reviewArr.value);
onBeforeMount(()=>
getReview()
)

</script>

<template>
        <div class="card-Review">
            <h1 class="itle-mffs">Review Web</h1>
              <div class="sa">
                <form @submit="addReview">
                 <label class="score-review" for="score">score :</label>
                 <input type="number" id="score" v-model="score" required min="0" max="5">
                 <label class="review-label" for="review">review :</label>
                 <input type="review" id="review" v-model="review" required >
                 <input class="submit" type="submit" >
            </form>
              </div>
             <div class="container-review-content">
                <div class="review-loop" v-for=" (review , index) in reviewArr" :key="index">
                 <div class="content">
                    <h4 class="username-mf"> username : {{review.user}}</h4>
                    <h4   class="time-mf">{{review.time}}</h4>
                    <h4 class="card-mf">review : {{review.review}}</h4>
                    <h4 class="score-mf">review : {{review.score}}</h4>
                     <hr class="hr-end">
                 </div>
              </div>
             </div>
        </div>

</template>

<style>
.container-review-content{
    height: 200px;
    width: 20%;
    position: absolute;
    left: 35%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.sa{
    width: 20px;
    position: absolute;
    left: 35%;
    top: 70%;
    transform: translate(-50%, -50%);
}
.itle-mffs{
    width: 100%;
    position: absolute;
    left: 50%;
    top: 18%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 40px;
}
 #score , #review , .submit {
    background-color: white;
    color: black;
}

.score-review{
    grid-area: 1 / 1; 
    width: 100px;
    text-align: center;
    padding: 5px 0 0 0 ;
    justify-self: end;
}
#score{
    width: 60px;
    height: 30px;
    text-align: center;
    grid-area: 1 / 2; 
    
}
.review-label{
    grid-area: 2 / 1; 
    width: 100px;
    text-align: center;
    padding: 5px 0 0 0 ;
    justify-self: end;
}
#review{
    grid-area: 2/2;
}
.submit{
    cursor: pointer;
    grid-area: 3 / 1 / span 1 / span 2;
}

form{
    display: grid;
    grid-template-rows: repeat(4 , 50%);
    grid-template-columns: repeat(2 , 50%);
    position: absolute;
    left: 40%;
    top: 50%;
    width: 1300px;
    height: auto;
    transform: translate(-50%, -560%);
    column-gap: 20px;
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