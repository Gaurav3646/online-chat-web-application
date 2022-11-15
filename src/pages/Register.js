import React from "react";
import classes from "./Register.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import Add from "../img/addAvatar.png";
import  chatLogo from "../img/logo.png";

import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loading/>}
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
      <div> <div><img src={chatLogo} width="50px"/></div>
        <div className={classes.logo}>My Chat</div></div>
        <span className={classes.title}>Register</span>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password " />
          <input style={{ display: "none" }} type="file" id="file"/>
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button style={{cursor:`${loading ===true ? "not-allowed": "pointer"}`}} disabled={loading}>Sign up</button>
          {err && <span style={{color:'#f95959'}}>Something went wrong</span>}
        </form>
        
        <p>You do have an account? <Link to="/login" className={classes.link}>Login</Link></p>
      </div>
      </div>
      </div>
  );
};

export default Register;
