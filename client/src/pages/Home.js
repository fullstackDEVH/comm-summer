import React from 'react';
import { Annoucement, Footer, Navbar, Newsletters, Products, Slider ,Categories} from '../components';

const Home = ()=>{
    return (
        <div className="container">
            <Annoucement />
            <Navbar />
            <Slider />
            <Categories />
            <Products isLimit={7} />
            <Newsletters />
            <Footer />
        </div>
    )
}

export default Home;