import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./ProductItem";
import { publicRequest } from "../requestMethod";

const Products = ({ sort, filters, isLimit}) => {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  
  useEffect(()=>{
    const getProducts = async ()=>{
      try {
          const res = await publicRequest.get('/products');
          setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  useEffect(()=>{
    handleFilter();
  }, [filters, sort])

  const handleFilter = ()=>{
    let newProducts = [...products]; // or = products.slice();
    if(filters?.color){
      newProducts = newProducts?.filter(product => product.categories.includes(filters.color.toLowerCase()));
    }
    if(filters?.size){
      newProducts = newProducts?.filter(product => product.size.includes(filters.size.toLowerCase()));
    }
    if(sort){
      if(sort === "desc"){
        newProducts = newProducts.sort((a, b) => a.price - b.price);
      }else if(sort === "asc"){
        newProducts = newProducts.sort((a, b) => b.price - a.price);
      }else{
        newProducts = newProducts.sort((a,b)=> a.createdAt - b.createdAt);
      }
    }
    setProductsFilter(newProducts);
  }
 
  return (
    <Container>
      {
        isLimit ? products.slice(0, isLimit).map((item, ind) => (
          <Product item={item} key={ind} />))
      :
        (productsFilter.length > 0 ? 
          productsFilter.map((item, ind) => (<Product item={item} key={ind} />)) 
          : 
          products.map((item, ind) => (<Product item={item} key={ind} /> ))
        )
      }
    </Container>
  )
};

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


export default Products;