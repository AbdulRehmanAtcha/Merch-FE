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

                            {/* Expense Case */}
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

    // Invenotry will be debited for every purchase we make
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
                    item?.description === 'Buy Stock' ?
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
                                <td>{item?.expenseCost} ({item?.description})</td>
                            </tr>
                        </> : null
                ))}
            </tbody>
        </table>
    );
    const renderRevenueTable = () => (
        <table>
            <thead>
                <tr>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {data?.data?.map((item, index) => (
                    item?.totalProfit ?
                        <>
                            <tr key={`utility-debit-${index}`}>
                                <td></td>
                                <td>{item?.totalProfit}</td>
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
            <div style={{ display: "flex", rowGap: "15px", flexWrap: "wrap", columnGap: "25px", alignItems: "center" }}>
                <div>
                    <h2>Cash Table</h2>
                    {renderCashTable()}
                </div>
                <div>
                    <h2>Revenue Table</h2>
                    {renderRevenueTable()}
                </div>
                <div>
                    <h2>Inventory Table</h2>
                    {renderInventoryTable()}
                </div>
                <div>
                    <h2>Utility Table</h2>
                    {renderUtilityTable()}
                </div>
                <div>
                    <h2>Account Payable Table</h2>
                    {renderAccPayableTable()}
                </div>
            </div>
        </div>
    );
};

export default Sheet;
