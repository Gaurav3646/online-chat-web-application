import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import classes from "./Home.module.css";
const Home = () => {
    return (
        <div className={classes.home}>
            <div className={classes.container}>
                <Sidebar />
              <Chat/> 
        </div>
     </div>
    );
};

export default Home;