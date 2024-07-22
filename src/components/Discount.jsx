import React, { useEffect, useState } from 'react'
import { useDiscountHandlerMutation } from '../redux/api'

const Discount = ({ onClose }) => {
    const [productData, setProductData] = useState({
        productDiscount: "",
        productId: ""
    })
    const [content, { isSuccess }] = useDiscountHandlerMutation()

    const HandleChange = (e) => {
        const { name, value } = e.target
        setProductData((prodData) => ({
            ...prodData,
            [name]: value
        }))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        content(productData)
    }

    useEffect(() => {
        if (isSuccess) {
            setProductData({
                productDiscount: "",
                productId: ""
            });
            alert("Discount Added Successfully");
            onClose()
        }
    }, [isSuccess])
    return (
        <form style={{ display: 'flex', flexDirection: "column", rowGap: "10px", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: "column", rowGap: "10px" }}>
                <div>
                    <label htmlFor="pPercent">Enter Discount Percentage</label>
                    <input style={{ height: "35px", width: "100%" }} type="number" id='pPercent' name='productDiscount' placeholder='Enter Discount Percentage' required onChange={(e) => HandleChange(e)} value={productData?.productDiscount} />
                </div>
                <div>
                    <label htmlFor="pId">Enter Product ID</label>
                    <input style={{ height: "35px", width: "100%" }} type="text" id='pId' name='productId' placeholder='Enter Product ID' required onChange={(e) => HandleChange(e)} value={productData?.productId} />
                </div>
            </div>
            <button style={{ height: "35px", width: "100%", cursor: "pointer" }} onClick={SubmitHandler}>Update Discount</button>
        </form>
    )
}

export default Discount
