import React , { useState, useRef } from "react";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncCreateProduct } from "../../redux/productSlice";
import { Publish } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [inputArr, setInputArr] = useState({});
  
  const imgRef = useRef(null);

  const navi = useNavigate();

  const dispatch = useDispatch();
  const {error, isFetching} = useSelector(state => state.products);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleInputArr = (e) => {
    setInputArr((pre) =>{
      return {...pre, [e.target.name]: e.target.value.split(',')}
    }
    );
  };
  const handleFile = (e) =>{
    let url = e.target.files[0];
    let urlPath = URL.createObjectURL(url);
    
    setFile(urlPath);
  }
  
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncCreateProduct({...inputArr,...inputs, img: file}));
    return navi('/products');
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <div className="addProductItem__avatar">
            <input
              type="file"
              id="file"
              onChange={handleFile}
              style={{display: 'none'}}
            />
            <img ref={imgRef} src={file || "https://quanaoxuongmay.com/wp-content/uploads/woocommerce-placeholder-600x600.png"} />
            <label htmlFor="file"><Publish /></label>
          </div>
        </div>
        <div className="addProductForm__bottom">
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input name="categories" type="text" placeholder="jeans,skirts" onChange={handleInputArr} />
          </div>
          <div className="addProductItem">
            <label>Color</label>
            <input name="color" type="text" placeholder="red, blue, green, yellow" onChange={handleInputArr} />
          </div>
          <div className="addProductItem">
            <label>Size</label>
            <input name="size" type="text" placeholder="red, blue, green, yellow" onChange={handleInputArr} />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" onChange={handleChange}>
              <option value="" selected hidden >Is stock</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button 
          onClick={handleCreate} 
          disabled={isFetching}
          className="addProductButton">
            Create
          </button>
        </div>  
      </form>
      {error && <p className="error">account creation failed</p>}
    </div>
  );
}