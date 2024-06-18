import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth"

async function login(email, password){
    let response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
}

async function register(email, password){
    let response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response);
}

async function logout(){
    signOut(auth);
}

async function resetPassword(email){
    let response = await sendPasswordResetEmail(auth, email);
    console.log(response);
}

export{
    login,
    register,
    logout,
    resetPassword
}