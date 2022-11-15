import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import  chatLogo from "../img/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    return <div className={classes.navbar}>
        <div> <div></div>
            <div className={classes.logo}><img src={chatLogo} width="50px" /></div></div>
        <div className={classes.user}>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
};

export default Navbar;