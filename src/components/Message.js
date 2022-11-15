import React, { useContext, useEffect, useRef } from "react";
import { saveAs } from 'file-saver';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import classes from "./Message.module.css";


const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
 
  const ref = useRef();
  console.log(message);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const downloadImage = () => {
    saveAs(message.img, 'image.jpg');
  }
var newDate = new Date(message.date.seconds * 1000)
var Hours = newDate.getHours()
  var Minutes = newDate.getMinutes()
  Hours = (Hours < 10)?("0"+Hours):Hours;
     var HourComplete = Hours + ':' + Minutes
  tConv24(HourComplete)
  var formatedTime;
function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = (H % 12) || 12;
  h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  formatedTime = ts;
};


  
  return (
    <div
      ref={ref}
      className={`${classes.message} ${message.senderId === currentUser.uid && classes.owner}`}
    >
      <div className={classes.messageInfo}>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatedTime}</span>
      </div>
      <div className={`${message.senderId === currentUser.uid ?  classes.messageContentOwner:classes.messageContent}`}>
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} onClick={downloadImage} alt="" />}
      </div>
    </div>
  );
};

export default Message;