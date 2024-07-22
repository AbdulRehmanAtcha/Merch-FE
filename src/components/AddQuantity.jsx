import React, { useEffect, useState } from 'react'
import { useUpdateStockMutation } from '../redux/api';
import { useNavigate } from 'react-router-dom';

const AddQuantity = ({ productId, onClose }) => {
    const [quantity, setQuantity] = useState(null)
    const [addContent, { isLoading, isSuccess, isError }] = useUpdateStockMutation();
    const navigate = useNavigate()


    const SubmitHandler = (e) => {
        e.preventDefault();
        const obj = {
            productId,
            quantity: Number(quantity)
        }
        addContent(obj)
    }

    useEffect(() => {
        if (isSuccess) {
            alert("Stock Added Successfully")
        }
        onClose()
        if (isError) {
            console.log("Error")
        }
    }, [isSuccess, isError])

    return (
        <form onSubmit={SubmitHandler} style={{ display: 'flex', flexDirection: "column", rowGap: "10px", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: "column", rowGap: "10px" }}>
                <label htmlFor="pQuantity">Enter new Quantity</label>
                <input style={{ height: "35px", width: "100%" }} type="number" id='pQuantity' name='productQuantity' placeholder='Enter new Quantity' required onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <button style={{ height: "35px", width: "100%", cursor: "pointer" }}>Update Quantity</button>
        </form>
    )
}

export default AddQuantity
