import React from "react";
import styled from "styled-components";

const Annoucement = ()=>{
    return <Container>Super Deal! Free Shipping On Orders Over $50</Container>
}

const Container = styled.div`
    height : 30px;
    background : teal;
    color : white;
    display : flex;
    align-items : center;
    justify-content : center;
    font-size : 16px;
    font-weight : 500;
    letter-spacing : 1.1px;
`;

export default Annoucement;