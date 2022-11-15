import React from "react";
import classes from "./Chat.module.css";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
import Input from "./Input";
const Chat = () => {
   const { data } = useContext(ChatContext);
   return <div className={classes.chat}>
      <div className={classes.chatInfo}>
         <span>{data.user?.displayName}</span>
         <div className={classes.chatIcons}>
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More}  alt=""/>
         </div>
      </div>
      <Messages />
      <Input/>
   </div>
};

export default Chat;