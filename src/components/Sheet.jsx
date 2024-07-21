import React from 'react'
import { useSheetHandlerQuery } from '../redux/api'

const Sheet = () => {
    const { data } = useSheetHandlerQuery()
    // if (data) {
    //     console.log(data)
    // }
    return (
        <div>
            <h1>General Journal Entry</h1>
            <table>
                <thead>
                    <tr>
                        <th>Particulars</th>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>Stock (Inventory)</td>
                        <td>20000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Cash/Bank (Payment)</td>
                        <td></td>
                        <td>20000</td>
                    </tr> */}
                    {/* {data?.data?.map((item, index) => (
                        item?.totalPrice ?
                            <>
                                <tr>
                                    <td>Cash</td>
                                    <td>{item?.totalPrice}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Items Sold</td>
                                    <td></td>
                                    <td>{item?.totalPrice}</td>
                                </tr>
                            </> :
                            item?.description === "Buy Stock" && item?.method === "Cash" ?
                                <>
                                    <tr>
                                        <td>Inventory</td>
                                        <td>{item?.expenseCost}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Cash</td>
                                        <td></td>
                                        <td>{item?.expenseCost}</td>
                                    </tr>
                                </>
                                :
                                item?.description === "Buy Stock" && item?.method === "Credit" ?
                                    <>
                                        <tr>
                                            <td>Inventory</td>
                                            <td>{item?.expenseCost}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Accounts Payable</td>
                                            <td></td>
                                            <td>{item?.expenseCost}</td>
                                        </tr>
                                    </>
                                    :
                                    item?.description === "Bill" && item?.method === "Cash" ?
                                        <>
                                            <tr>
                                                <td>Utility Bills Paid</td>
                                                <td>{item?.expenseCost}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Cash</td>
                                                <td></td>
                                                <td>{item?.expenseCost}</td>
                                            </tr>
                                        </> :
                                        item?.description === "Bill" && item?.method === "Credit" ?
                                            <>
                                                <tr>
                                                    <td>Utility Bills Paid</td>
                                                    <td>{item?.expenseCost}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Accounts Payable</td>
                                                    <td></td>
                                                    <td>{item?.expenseCost}</td>
                                                </tr>
                                            </>
                    ))} */}

                    {data?.data?.map((item, index) => {
                        // Destructure for better readability
                        const { totalPrice, expenseCost, description, method } = item || {};

                        // Render rows based on the item properties
                        if (totalPrice) {
                            return (
                                <>
                                    <tr key={`${index}-totalPrice`}>
                                        <td>Cash</td>
                                        <td>{totalPrice}</td>
                                        <td></td>
                                    </tr>
                                    <tr key={`${index}-itemsSold`}>
                                        <td>Items Sold</td>
                                        <td></td>
                                        <td>{totalPrice}</td>
                                    </tr>
                                </>
                            );
                        }

                        if (description === "Buy Stock" && method === "Cash") {
                            return (
                                <>
                                    <tr key={`${index}-inventory-cash`}>
                                        <td>Inventory</td>
                                        <td>{expenseCost}</td>
                                        <td></td>
                                    </tr>
                                    <tr key={`${index}-cash`}>
                                        <td>Cash</td>
                                        <td></td>
                                        <td>{expenseCost}</td>
                                    </tr>
                                </>
                            );
                        }

                        if (description === "Buy Stock" && method === "Credit") {
                            return (
                                <>
                                    <tr key={`${index}-inventory-credit`}>
                                        <td>Inventory</td>
                                        <td>{expenseCost}</td>
                                        <td></td>
                                    </tr>
                                    <tr key={`${index}-accounts-payable`}>
                                        <td>Accounts Payable</td>
                                        <td></td>
                                        <td>{expenseCost}</td>
                                    </tr>
                                </>
                            );
                        }

                        if (description === "Bill" && method === "Cash") {
                            return (
                                <>
                                    <tr key={`${index}-utility-cash`}>
                                        <td>Utility Bills Paid</td>
                                        <td>{expenseCost}</td>
                                        <td></td>
                                    </tr>
                                    <tr key={`${index}-cash`}>
                                        <td>Cash</td>
                                        <td></td>
                                        <td>{expenseCost}</td>
                                    </tr>
                                </>
                            );
                        }

                        if (description === "Bill" && method === "Credit") {
                            return (
                                <>
                                    <tr key={`${index}-utility-credit`}>
                                        <td>Utility Bills Paid</td>
                                        <td>{expenseCost}</td>
                                        <td></td>
                                    </tr>
                                    <tr key={`${index}-accounts-payable`}>
                                        <td>Accounts Payable</td>
                                        <td></td>
                                        <td>{expenseCost}</td>
                                    </tr>
                                </>
                            );
                        }

                        // Return null or a default element if none of the conditions are met
                        return null;
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default Sheet
