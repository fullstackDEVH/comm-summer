import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, ParkRounded } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState ,useEffect} from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function UserList() {
  const [data, setData] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser);

  const getUsers = async () => {
    try {
      const res = await userRequest.get("users/finds");
      setData(res.data);
    } catch {}
  };

  useEffect(()=> {
    getUsers();
  }, [])

  const handleDelete = async (id) => {
    try {
       await userRequest.delete(`users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
    
    // setData(data.filter((item) => item.id !== id));

  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {   
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200
  },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        
        return(
          <p>{params.row._id === currentUser._id ? "online" : "offline"}</p>
        )
      }
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
      
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="userList__top">
        <h2>{data.length} user</h2>
        <Link to="/newUser">
              <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}