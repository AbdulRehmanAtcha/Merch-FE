import React, { useEffect, useState } from 'react'
import { useAddProductMutation } from '../redux/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [addContent, { isLoading, isSuccess, isError }] = useAddProductMutation();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productName: "",
        productBasePrice: "",
        productSellPrice: "",
        productQuantity: "",
        productImage: ""
    })
    const HandleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'productImage') {
            setProductData((prdData) => ({
                ...prdData,
                [name]: files[0]
            }));
        } else {
            setProductData((prdData) => ({
                ...prdData,
                [name]: value
            }));
        }
    };


    const HandleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productData.productName);
        formData.append('productBasePrice', productData.productBasePrice);
        formData.append('productSellPrice', productData.productSellPrice);
        formData.append('productQuantity', productData.productQuantity);
        if (productData.productImage) {
            formData.append('productImage', productData.productImage);
        }

        addContent(formData);
    };


    useEffect(() => {
        if (isSuccess) {
            console.log("Success")
            navigate("/admin")
        }
        if (isError) {
            console.log("Error")
        }
    }, [isSuccess, isError])
    return (
        <div className='add-product'>
            <form className="add-form" onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor="pName">Product Name</label>
                    <input type="text" id='pName' name='productName' placeholder='Enter Product Name' required onChange={(e) => HandleChange(e)} />
                </div>
                <div>
                    <label htmlFor="pPrice">Product Price (Purchased)</label>
                    <input type="number" min={1} id='pPrice' name='productBasePrice' placeholder='Enter Product Purchased Price' required onChange={(e) => HandleChange(e)} />
                </div>
                <div>
                    <label htmlFor="sPrice">Product Price (To Sell)</label>
                    <input type="number" min={1} id='sPrice' name='productSellPrice' placeholder='Enter Product Sell Price ' required onChange={(e) => HandleChange(e)} />
                </div>
                <div>
                    <label htmlFor="pQuantity">Product Quantity</label>
                    <input type="number" min={1} id='pQuantity' name='productQuantity' placeholder='Enter Product Quantity' required onChange={(e) => HandleChange(e)} />
                </div>
                <div>
                    <label htmlFor="pImage">Product Image</label>
                    <input type="file" id='pImage' name='productImage' required onChange={(e) => HandleChange(e)} />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddProduct
