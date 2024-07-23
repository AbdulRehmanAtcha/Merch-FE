import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementFromCart, resetCart } from '../redux/reducer'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import { useOrderHandlerMutation } from '../redux/api'

const Cart = () => {
    const { products, cart, totalPrice, totalItems } = useSelector((state) => state?.myReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [content, { isLoading, isSuccess }] = useOrderHandlerMutation()

    const OrderHandler = () => {
        const totalPriceNumber = Number(totalPrice);
        // if (isNaN(totalPriceNumber)) {
        //     throw new Error("Invalid total price");
        // }

        const order = { cart, totalPrice: totalPriceNumber, totalItems };
        content(order);
    };



    useEffect(() => {
        if (isSuccess) {
            alert("Your Order Created Successfully");
            dispatch(resetCart());
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [isSuccess])
    return (
        <>
            <Header />
            {cart?.length === 0 ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap:"10px" }}>
                <h1>Your Cart Is Empty</h1>
                <Link to={"/"}>
                    <button style={{width:"200px", backgroundColor:"rgb(30, 122, 30)", height:"50px", color:"white", border:"none", cursor:"pointer"}}>Continue Shopping</button>
                </Link>
            </div> : <div className='cart-parent'>
                <div className="cart">
                    <div className="cart-left">
                        <h1>Your Cart</h1>
                        <h2>Total Price: {totalPrice}</h2>
                        <Link to={"/"}>
                            <button>Continue Shopping</button>
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.map((item, index) => {
                                    const cartItem = cart.find(cartItem => cartItem._id === item._id);
                                    const prodItem = products?.data?.find(prodItem => prodItem._id === item._id);
                                    const isDisabled = cartItem && cartItem.quantity >= prodItem.productQuantity || prodItem.productQuantity === 0;
                                    console.log(isDisabled)
                                    return (
                                        <tr key={index}>
                                            <td>{item?.productName}</td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.productFinalPrice}</td>
                                            <td className='action-buttons'>
                                                <button onClick={() => dispatch(addToCart({
                                                    productImage: item.productImage,
                                                    productName: item.productName,
                                                    productFinalPrice: Number(item.productFinalPrice),
                                                    _id: item._id
                                                }))}
                                                    disabled={isDisabled}
                                                >+</button>
                                                <button onClick={() => dispatch(decrementFromCart({ _id: item._id }))}>-</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-right">
                        <button onClick={OrderHandler}>Confirm Order</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Cart
