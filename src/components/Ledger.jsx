import React from 'react';
import { useSheetHandlerQuery } from '../redux/api';

const Sheet = () => {
    const { data } = useSheetHandlerQuery();
    if (data) {
        console.log(data);
    }

    const renderCashTable = () => (
        <table>
            <thead>
                <tr>
                    {/* <th>Particulars</th> */}
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.map((item, index) => (
                    item?.totalPrice ?
                        <>
                            <tr key={`cash-debit-${index}`}>
                                <td>{item?.totalPrice}</td>
                                <td></td>
                            </tr>

                        </> : item?.method === 'Cash' ?
                            <>

                                <tr key={`cash-payment-${index}`}>
                                    {/* <td>{item?.method}</td> */}
                                    <td></td>
                                    <td>{item?.expenseCost}</td>
                                </tr>
                            </> : null
                ))}
            </tbody>
        </table>
    );

    const renderInventoryTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.map((item, index) => (
                    item?.totalPrice ?
                        <>
                            <tr key={`inventory-debit-${index}`}>
                                <td></td>
                                <td>{item?.totalPrice}</td>
                            </tr>
                        </> : item?.description === 'Buy Stock' ?
                            <>
                                <tr key={`inventory-purchase-${index}`}>
                                    <td>{item?.expenseCost}</td>
                                    <td></td>
                                </tr>
                            </> : null
                ))}
            </tbody>
        </table>
    );

    const renderUtilityTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.map((item, index) => (
                    item?.description === 'Bill' ?
                        <>
                            <tr key={`utility-debit-${index}`}>
                                <td>{item?.expenseCost}</td>
                                <td></td>
                            </tr>
                        </> : null
                ))}
            </tbody>
        </table>
    );

    const renderAccPayableTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.map((item, index) => (
                    item?.method === 'Credit' ?
                        <>
                            <tr key={`utility-debit-${index}`}>
                                <td></td>
                                <td>{item?.expenseCost}</td>
                            </tr>
                        </> : null
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <h1>Ledger Posting</h1>
            <br />
            <br />
            <hr />
            <br />
            <h2>Cash Table</h2>
            {renderCashTable()}
            <h2>Inventory Table</h2>
            {renderInventoryTable()}
            <h2>Utility Table</h2>
            {renderUtilityTable()}
            <h2>Account Payable Table</h2>
            {renderAccPayableTable()}
        </div>
    );
};

export default Sheet;
