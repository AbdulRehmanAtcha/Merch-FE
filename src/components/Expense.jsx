import React, { useEffect, useState } from 'react';
import { useExpenseHandlerMutation } from '../redux/api';

const Expense = ({ onClose }) => {
    const [expenseData, setExpenseData] = useState({
        expenseCost: "",
        method: "",
        description: ""
    });

    const [content, { isSuccess }] = useExpenseHandlerMutation();

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prodData) => ({
            ...prodData,
            [name]: value
        }));
    };

    const SubmitHandler = (e) => {
        e.preventDefault();
        content(expenseData);
    };

    useEffect(() => {
        if (isSuccess) {
            setExpenseData({
                expenseCost: "",
                method: "",
                description: ""
            });
            alert("Expense Added Successfully");
            onClose();
        }
    }, [isSuccess]);

    return (
        <form style={{ display: 'flex', flexDirection: "column", rowGap: "10px", width: "100%" }} onSubmit={SubmitHandler}>
            <div style={{ display: 'flex', flexDirection: "column", rowGap: "10px" }}>
                <label>Expense Cost</label>
                <input type="number" name="expenseCost" value={expenseData.expenseCost} placeholder='Enter Expense Cost' onChange={HandleChange} style={{ height: "35px" }} />
            </div>
            <div>
                <h3>Expense Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input type="radio" name="method" value="Cash" id='cash' checked={expenseData.method === "Cash"} onChange={HandleChange} />
                    <label htmlFor='cash'>Cash</label>
                </div>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input id='credit' type="radio" name="method" value="Credit" checked={expenseData.method === "Credit"} onChange={HandleChange} />
                    <label htmlFor='credit'>Credit</label>
                </div>
            </div>
            <hr />
            <div>
                <h3>Expense Name</h3>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input type="radio" name="description" value="Buy Stock" id='stock' checked={expenseData.description === "Buy Stock"} onChange={HandleChange} />
                    <label htmlFor='stock'>Buy Stock</label>
                </div>
                <div style={{ display: 'flex', flexDirection: "row", columnGap: "4px" }}>
                    <input id='bill' type="radio" name="description" value="Bill" checked={expenseData.description === "Bill"} onChange={HandleChange} />
                    <label htmlFor='bill'>Utility Bill</label>
                </div>
            </div>
            <button type="submit" style={{ height: "35px", width: "100%", cursor: "pointer" }}>Add Expense</button>
        </form>
    );
};

export default Expense;
