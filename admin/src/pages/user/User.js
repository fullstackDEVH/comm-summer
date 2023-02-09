import React , { useEffect, useState, useRef } from "react";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
  import { Link , useParams, useNavigate } from "react-router-dom";
  import "./user.css";
  import { userRequest } from "../../requestMethods";

  
  export default function User() {
    const navi = useNavigate();
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [newUser, setNewUser] = useState({});
    const [inputFile, setInputFile] = useState('');
    const imgRef = useRef(null);
   

    useEffect(()=>{
      const getUser = async () =>{
        const {data} = await userRequest.get('users/find/' + userId);
        setUser(data);
      }
      getUser()
    }, []);

    const handleInputs = (e)=>{
      setNewUser(pre => {
        return {...pre, [e.target.name] : e.target.value }
      })
    }

    const handleUpdateUser = async (e)=>{
      e.preventDefault();
      let updateUser ;
      if(inputFile){
        updateUser = {
          ...newUser, img : inputFile
        }
      }else{
        updateUser = {
          ...newUser, img : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
        }
      }
      try {
        const response = await userRequest.put(`users/${userId}` , updateUser);
        if(response.data) return navi('/users')
      } catch (error) {
        console.log(error.message);
      }
    }

    const handleChangeInputFile = (e)=>{
      let url = e.target.files[0];
      let fileUrl = URL.createObjectURL(url);  
      imgRef.current.src= fileUrl;
      setInputFile(fileUrl)
    }

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    name="username"
                    onChange={handleInputs}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    type="text"
                    name = "password"
                    placeholder='password'
                    className="userUpdateInput"
                    onChange={handleInputs}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                    onChange={handleInputs}
                  />
                </div>
    
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    ref={imgRef}
                    className="userUpdateImg"
                    src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} 
                    onChange={handleChangeInputFile}
                  />
                </div>
                <button className="userUpdateButton" onClick ={handleUpdateUser}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }