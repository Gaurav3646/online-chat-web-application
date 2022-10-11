import React from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import Add from "../img/addAvatar.png";
import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value.trim();
    const password = event.target[2].value.trim();
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
      
        (error) => {
          setErr(true);
         },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(res.user, {
                  displayName,
                  photoURL:downloadURL,
              });
            
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
                displayName,
               email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Register</span>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password " />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login" className="link">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
