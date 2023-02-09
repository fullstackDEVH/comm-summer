import React from 'react';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from "./pages/ProductList";
import Register from './pages/Register';
import Pay from './pages/Pays/Pay';
import PaySuccess from './pages/Pays/PaySuccess';
import { Routes, Route , Link, Navigate } from "react-router-dom";
import ScrollTop from './components/ScrollTop';

import { useSelector } from "react-redux";

const App = ()=>{
    const { currentUser } = useSelector(state => state.user);
    
    return (
        <>
            <ScrollTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
            </Routes>
        </>
    )
}

export default App;