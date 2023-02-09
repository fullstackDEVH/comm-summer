import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { fetchAsyncUpdateProduct } from "../../redux/productSlice";

export default function Product() {
  const location = useLocation();
  const navi = useNavigate();

  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const {error, isFetching} = useSelector(state => state.products);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const handleFile = (e) =>{
    let url = e.target.files[0];
    let urlPath = URL.createObjectURL(url);
    setFile(urlPath);
  }

  const product = useSelector((state) =>
    state.products.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleClick = (e)=>{
    e.preventDefault();
    let newProduct;
    if(file){
      newProduct = {...inputs, img : file}
    }else{
      newProduct = {...inputs};
    }
    dispatch(fetchAsyncUpdateProduct({newProduct, productId}));
    return navi('/products');
  }

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? "Stocking" : "Out of stock"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product title</label>
            <input name="title" type="text" placeholder={product.title} onChange={handleChange} />
            <label>Product Description</label>
            <input name="desc" placeholder={product.desc} onChange={handleChange}  />
            <label>Price</label>
            <input type="number" placeholder={product.price} onChange={handleChange}  />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange} >
              <option value="" disabled hidden>Is Stock</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} 
                onChange={handleFile}
              />
            </div>
            <button className="productButton" 
              disabled={isFetching}
              onClick={handleClick}>Update</button>
          </div>
        </form>
        {error && <p>updating failed</p>}
      </div>
    </div>
  );
}