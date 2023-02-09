import React, {useState} from "react";
import "./newUser.css";
import { Publish } from "@mui/icons-material";
import {userRequest} from "../../requestMethods";
import {useNavigate} from "react-router-dom";

export default function NewUser() {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navi = useNavigate();
  
  const handleInputs = (e)=>{
    setUser(pre =>{
      return {...pre, [e.target.name] : e.target.value}
    })
  }

  const handleFile = (e)=>{
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
    setIsLoading(true);
    const res = await userRequest.post('users/', 
    {
      img : file || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif", 
      ...user
    });
    setIsLoading(false);
    if(res.data) return navi('/users');
   } catch (error) {
     console.log(error.message);
   }
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>   
        <div className="newUserItem avatar">
          <img src={file || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} />
          <label htmlFor="file"> <Publish /></label>
          <input id="file" type="file" style={{display:"none"}} 
            onChange={handleFile}
          />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="username" onChange={handleInputs} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="john@gmail.com"
            onChange={handleInputs}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="password" 
            onChange={handleInputs}
          />
        </div>
        <div className="newUserItem">
          <label>Is admin</label>
          <select name="isAdmin" className="newUserSelect" id="active"
            onChange={handleInputs}
          >
            <option value="" disabled selected hidden >Option authorization</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button disabled={isLoading} className="newUserButton">Create</button>
      </form>
    </div>
  );
}