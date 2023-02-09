import React, {useRef} from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userSlice"; 
import {useNavigate} from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const navi = useNavigate();


  const clickModal =()=>{
    modalRef.current.classList.toggle('active');
  }

  const handleLogOut = ()=>{
    dispatch(logOut());
    modalRef.current.classList.remove('active');
    return navi("/login")
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings onClick={clickModal} />
            <ul className="topbarIconContainer__list" ref={modalRef}>
              <li>Profile</li>
              <li onClick={handleLogOut}>Logout</li>
            </ul>
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
