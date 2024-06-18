// import { firestore } from "./firebase";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


// // function to CREATE a new document
// async function createDocument(document, payloadnewName, newAge){
//     await addDoc(usersCollection, {name:newName, age:Number(newAge)});
// }

let appData = [
    {
        "topic":"Array",
        "statement":"Array Problem 1",
        "link":"Link 1",
        "level":"Easy",
        "status":"Solved",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Array",
        "statement":"Array Problem 2",
        "link":"Link 2",
        "level":"Moderate",
        "status":"Solved with help",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Array",
        "statement":"Array Problem 3",
        "link":"Link 3",
        "level":"Hard",
        "status":"Unsolved",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Linked List",
        "statement":"Linked List Problem 1",
        "link":"Link 1",
        "level":"Easy",
        "status":"Solved",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Linked List",
        "statement":"Linked List Problem 2",
        "link":"Link 2",
        "level":"Moderate",
        "status":"Solved with help",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Linked List",
        "statement":"Linked List Problem 3",
        "link":"Link 3",
        "level":"Hard",
        "status":"Unsolved",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Trees",
        "statement":"Trees Problem 1",
        "link":"Link 1",
        "level":"Easy",
        "status":"Solved",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Trees",
        "statement":"Trees Problem 2",
        "link":"Link 2",
        "level":"Moderate",
        "status":"Solved with help",
        "notes":"New Notes",
        "solution":""
    },
    {
        "topic":"Trees",
        "statement":"Trees Problem 3",
        "link":"Link 3",
        "level":"Hard",
        "status":"Unsolved",
        "notes":"New Notes",
        "solution":""
    }
]

function fetchAllData(){
    return appData;
}

function postTopic(topic){
    appData[topic] = [];
}

export {
    fetchAllData,
    postTopic
}