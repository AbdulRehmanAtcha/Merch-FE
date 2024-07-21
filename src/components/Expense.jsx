import React, { useEffect, useState } from 'react'
import { useExpenseHandlerMutation } from '../redux/api'

const Expense = ({ onClose }) => {
    const [expenseData, setExpenseData] = useState({
        expenseCost: "",
        method: "",
        description: ""
    })

    const [content, { isSuccess }] = useExpenseHandlerMutation()

    const HandleChange = (e) => {
        const { name, value } = e.target
        setExpenseData((prodData) => ({
            ...prodData,
            [name]: value
        }))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        content(expenseData)
    }

    useEffect(() => {
        if (isSuccess) {
            setExpenseData({
                productDiscount: "",
                productId: ""
            });
            onClose()
        }
    }, [isSuccess])
    return (
        <form style={{ display: 'flex', flexDirection: "column", rowGap: "10px", width: "100%" }}>
            <div style={{ display: 'flex', flexDirection: "column", rowGap: "10px" }}>
                <label>Expense Cost</label>
                <input type="number" name="expenseCost" placeholder='Enter Expense Cost' onChange={(e) => HandleChange(e)} />
            </div>
            <div>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input type="radio" name="method" value="Cash" id='cash' onChange={(e) => HandleChange(e)} />
                    <label htmlFor='cash' >Cash</label>
                </div>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input id='credit' type="radio" name="method" value="Credit" onChange={(e) => HandleChange(e)} />
                    <label htmlFor='credit' >Credit</label>
                </div>
            </div>
            <hr />
            {/* <input type="text" name="description" placeholder='Small Description' onChange={(e) => HandleChange(e)} /> */}
            <div>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input type="radio" name="description" value="Buy Stock" id='stock' onChange={(e) => HandleChange(e)} />
                    <label htmlFor='stock' >Buy Stock</label>
                </div>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input id='bill' type="radio" name="description" value="Bill"  onChange={(e) => HandleChange(e)} />
                    <label htmlFor='bill' >Utility Bill</label>
                </div>
            </div>
            <button onClick={SubmitHandler} style={{ height: "35px", width: "100%", cursor: "pointer" }}>Add Expense</button>
        </form>
    )
}

export default Expense
