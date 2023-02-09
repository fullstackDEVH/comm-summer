import React, { useEffect, useState  } from 'react';
import styled from "styled-components";
import { Annoucement, Footer, Navbar, Newsletters, Products } from '../components';
import axios from 'axios';
import { mobile } from "../responsive";
import { useParams} from "react-router-dom";

const ProductList = ()=>{
    const [filters, setFilter] = useState({
        color : "",
        size : ""
    });
   
    const [sort, setSort] = useState('newest');
  
   const handleFilter = (e)=> {
        setFilter({
           ...filters,
           [e.target.name] : e.target.value,
        })
   };

   useEffect(()=>{
        window.scrollTo(0,0);
   }, []);

    return (
        <Container>
            <Navbar />
            <Annoucement />
            
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilter}>
                        <Option selected value = "">
                            Color
                        </Option>
                        <Option>WHITE</Option>
                        <Option>RED</Option>
                        <Option>PINK</Option>
                        <Option>BLACK</Option>
                        <Option>BLUE</Option>
                    </Select>
                    <Select name="size" onChange={handleFilter}>
                        <Option value = "" selected>
                        Size
                        </Option>
                        <Option>XS</Option>
                        <Option>M</Option>
                        <Option>XL</Option>
                        <Option>XXL</Option>
                        <Option>XXXL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e)=>setSort(e.target.value)}>
                        <Option selected>Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>

            <Products filters={filters} sort={sort} />
            <Newsletters />
            <Footer />
        </Container>
    )
}


const Container = styled.div``;
 
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

export default ProductList;