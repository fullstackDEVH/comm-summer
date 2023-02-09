import React, {useEffect, useState} from 'react';
import {  useDispatch } from "react-redux";
import styled from "styled-components";
import { Annoucement, Footer, Navbar, Newsletters } from '../components';
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive"; 
import { useParams } from 'react-router-dom';
import { publicRequest } from "../requestMethod";
import { addInCart } from "../redux/cartSlice";

const Product = ()=>{
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [section, setSection] = useState({
    quantity : 1,
    color : null,
    size : null
  });
  const dispatch = useDispatch();

  useEffect(()=>{
    const getProduct = async ()=>{
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct()
  } , [id]);

  useEffect(()=>{
    window.scrollTo(0 ,0);
  }, [id])

  const handleSection = (type) =>{
    if(type === "minus"){
      section.quantity > 1 && setSection({...section, quantity : section.quantity -1})
    }else{
      setSection({...section, quantity : section.quantity + 1})
    }
  }

  const handleAddToCart = () =>{
  
    if(!section.color || !section.size){
      alert('please, choose color and size for product');
    }
    else{
      dispatch(addInCart({
        ...product,
        customer_select : section
      }));
      setSection({
        quantity : 1,
        color : null,
        size : null
      });
    }
  }

    return (
        <Container>
            <Navbar />
            <Annoucement />

            <Wrapper>
                <ImgContainer>
                    <Image src={product?.img} />
                </ImgContainer>

                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>$ {product?.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.categories?.map(color =>(<FilterColor color={color} key={color} onClick= {()=>setSection({...section, color})} />))}
                        </Filter>
                        <Filter>
                          <FilterTitle>Size</FilterTitle>
                          <FilterSize onChange= {(e)=>setSection({...section, size : e.target.value})} >
                            <FilterSizeOption value = "" selected>
                              Choose Size
                          </FilterSizeOption>
                            {
                              product.size?.map(s =>(<FilterSizeOption key={s} 
                              >{s}</FilterSizeOption>))
                            }
                          </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                          <Remove onClick={()=>handleSection('minus')} />
                          <Amount>{section.quantity}</Amount>
                          <Add onClick={()=> handleSection('plus')} />
                        </AmountContainer>
                        <Button onClick = {handleAddToCart}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            
            <Newsletters />
            <Footer />
        </Container>
    )
}

const Container = styled.div``

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

export default Product;