import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import  chatLogo from "../img/logo.png";
import classes from "./Login.module.css";
import Loading from "../components/Loading";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    setErr(false);
    setLoading(true);
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
    setLoading(false);
  };
  return (
    <div>
      {loading && <Loading/>}
      <div className={classes.formContainer}>
        <div className={classes.formWrapper}>
         <div> <div><img src={chatLogo} width="50px"/></div>
        <div className={classes.logo}>My Chat</div></div>
        <span className={classes.title}>Login</span>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button style={{cursor:`${loading ===true ? "not-allowed": "pointer"}`}} disabled={loading}>Sign in</button>
          {err && <span style={{color:'#f95959'}}>Something went wrong</span>}
        </form>
       
        <p>You don't have an account? <Link to="/register" className={classes.link}>Register</Link></p>
      </div>
    </div></div>
  );
};

export default Login;