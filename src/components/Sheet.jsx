import React from 'react'
import { useSheetHandlerQuery } from '../redux/api'

const Sheet = () => {
    const { data } = useSheetHandlerQuery()
    if (data) {
        console.log(data)
    }
    return (
        <div>
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
                    {data?.data?.map((item, index) => (
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
                            <>
                                <tr>
                                    <td>{item?.description}</td>
                                    <td>{item?.expenseCost}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{item?.method}</td>
                                    <td></td>
                                    <td>{item?.expenseCost}</td>
                                </tr>
                            </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Sheet
