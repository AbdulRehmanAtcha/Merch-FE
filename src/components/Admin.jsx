import React, { useEffect, useState } from 'react'
import { useAllProductsQuery, useDeleteProductMutation, useRemoveDiscountMutation } from '../redux/api'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import AddQuantity from './AddQuantity'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/reducer'
import Discount from './Discount'
import Expense from './Expense'

const Admin = () => {
    const { data: apiData, isLoading, isSuccess, isError } = useAllProductsQuery()
    const [content] = useDeleteProductMutation()
    const [content2] = useRemoveDiscountMutation()
    const [activeId, setActiveId] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [discountModal, setDiscountModal] = useState(false)
    const [expenseModal, setExpenseModal] = useState(false)
    const dispatch = useDispatch()
    // const {data} = useSelector((c) => console.log(c?.myReducer?.products))
    const { data } = useSelector((state) => state?.myReducer?.products)
    useEffect(() => {
        if (apiData && !isLoading) {
            dispatch(setProducts(apiData))
        }
    }, [apiData])

    const StockHandler = (id) => {
        setActiveId(id)
        setModalOpen(true)
    }

    const DeleteHandler = (id) => {
        content({ productId: id })
    }

    const RemoveDiscountHandler = (id) => {
        content2({ prodId: id })
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <div className='admin-main'>
            <div className="admin-header">
                <h1>All Products</h1>
                <div style={{ display: 'flex', columnGap: "10px" }}>
                    <Link to={"/add-product"}>
                        <button>Add New Product</button>
                    </Link>
                    <button onClick={() => setDiscountModal(true)}>Add Discount</button>
                    <button onClick={() => setExpenseModal(true)}>Add Expense</button>
                    <Link to={"/sheet"}>
                        <button>View Balance Sheet</button>
                    </Link>
                    <Link to={"/ledger"}>
                        <button>View Ledger Posting</button>
                    </Link>
                </div>
            </div>
            <div className="table-conatiner">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price (Purchased)</th>
                        <th>Price (To Sell)</th>
                        <th>Quantity Left</th>
                        <th>Actions</th>
                    </tr>
                    {data?.map((item, index) => (
                        <tr key={index} className={`${item?.productQuantity === 0 ? "danger" : ""}`}>
                            <td>{item?._id}</td>
                            <td>{item?.productName}</td>
                            <td>{item?.productBasePrice}</td>
                            <td>{item?.productFinalPrice} {item?.productDiscount !== 0 ? `(${item?.productDiscount + "% Discount)"}` : ""}</td>
                            <td>{item?.productQuantity}</td>
                            <td className='action-buttons'>
                                <button onClick={() => StockHandler(item?._id)}>Add Stock</button>
                                <button onClick={() => DeleteHandler(item?._id)}>Delete</button>
                                {item?.productDiscount !== 0 && <button onClick={() => RemoveDiscountHandler(item?._id)}>Remove Discount</button>}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>

            <Modal modalIsOpen={modalOpen} onClose={() => setModalOpen(false)} >
                <AddQuantity productId={activeId} onClose={() => setModalOpen(false)} />
            </Modal>
            <Modal modalIsOpen={discountModal} onClose={() => setDiscountModal(false)} >
                <Discount onClose={() => setDiscountModal(false)} />
            </Modal>
            <Modal modalIsOpen={expenseModal} onClose={() => setExpenseModal(false)} >
                <Expense onClose={() => setExpenseModal(false)} />
            </Modal>
        </div>
    )
}

export default Admin
