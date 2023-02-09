import React from 'react' // nạp thư viện react
import {Routes, Route, Navigate} from 'react-router-dom';
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import "./index.css";
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';

import { useSelector } from "react-redux";
import H1 from './H1';

function App() {
    const { currentUser } = useSelector(state => state.user);
   
    return (
        <>
            
            <Topbar />
            <div className="container" >
                <Sidebar />
                <Routes>
                        <Route path="/login" element={currentUser?.isAdmin ? <Navigate to="/" /> : <Login />} />
                        <Route path="/" element= { currentUser?.isAdmin ? <Home /> : <Navigate to="/login" /> } />
                        <Route path="/users" element={<UserList />}  />
                        <Route path="/user/:userId" element = {<User />} />
                        <Route path="/newUser" element = {<NewUser />} />
                         <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:id" element={<Product />}  />
                        <Route path="/newProduct" element={<NewProduct />} />
                </Routes>
            </div>
        </>
    )
}

export default App;