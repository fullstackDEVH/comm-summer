import React from 'react';
import styled from 'styled-components';
import {GoSearch} from "react-icons/go";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ()=>{
    const cart = useSelector(state=>state.cart);
    const { currentUser } = useSelector(state => state.user);
    return (
        <Container>
           <Wrapper>
               <Left>
                   <Language>ENGLISH</Language>
                   <SearchContainer>
                        <Input />
                        <GoSearch color='gray' fontSize={18} />
                   </SearchContainer>
               </Left>
               <Center to="/">
                   <Logo>H_DEV</Logo>
               </Center>
               <Right>
                   {
                       !currentUser ? (
                        <>
                            <MenuItem to="/register">Register</MenuItem>
                            <MenuItem to="/login">Sign In</MenuItem>
                        </>
                       )
                        :
                       (
                       <>   <MenuItem to="/profile">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </MenuItem>
                            <MenuItem to="/cart">
                                <Badge badgeContent={cart.productsList?.length} color="secondary">
                                    <ShoppingCartOutlinedIcon color="action" />
                                </Badge>    
                            </MenuItem>
                       </>
                       )
                       
                   }
                   
               </Right>
           </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    height: 60px;
    // background: black;

`;

const Wrapper = styled.div`
    padding : 10px 20px;
    display : flex;
    justify-content : space-between;
    align-items : center;
`;

// left
const Left = styled.div`
    flex: 1;
    display : flex;
    align-items : center;
`;

const Language = styled.div`
    font-size : 14px;
    cursor : pointer;
`;

const SearchContainer = styled.div`
    border : 1px solid lightgray;
    display : flex;
    align-items : center;
    margin-left : 20px;
    padding : 5px;
`;

const Input = styled.input`
    border : none;
    outline : none;
`;

// center
const Center = styled(Link)`
    flex: 1;
`

const Logo = styled.h1`
    text-align : center;
`;

// right
const Right = styled.div`
    flex : 1;
    display : flex;
    align-items : center;
    justify-content : flex-end;
    gap : 20px;
    text-transform : uppercase;
`;

const MenuItem = styled(Link)`

`;

export default Navbar;