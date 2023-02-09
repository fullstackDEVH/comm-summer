import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollTop = ()=>{
    const ref = useRef(null);
    useEffect(()=>{
        window.addEventListener("scroll", (e)=>{     
            window.pageYOffset > 600 ? ref.current.classList.add('visible') : 
            ref.current.classList.remove('visible')
        })

        return ()=>{
            window.removeEventListener("scroll");
        }
    }, []);

    const handleClick = ()=>{
        window.scrollTo(0, 0);
    }

    return <Container ref ={ref} onClick={handleClick}>
        <ArrowUpwardIcon />
    </Container>
}

const Container = styled.div`
    width : 60px;
    height : 60px;
    border-radius : 50%;
    position : fixed;
    bottom : 100px;
    right : 20px;
    cursor : pointer;
    z-index : 99;
    border : 1px solid black;

    display : flex;
    align-items : center;
    justify-content : center;
    background: teal;
    color : white;
    opacity : 0;
    visibility : hidden;
    transition : all 0.3s ease;
    
    &.visible {
        visibility : visible;
        opacity : 1;
    }
`

export default ScrollTop;