import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import classes from "./Sidebar.module.css";
const Sidebar = () => {
    return <div className={classes.sidebar}>
        <Navbar />
        <Search />
        <Chats/>
    </div>
};

export default Sidebar;