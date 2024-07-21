import React, { useEffect } from 'react'
import trolley from "../assets/trolley.png"
import { useAllProductsQuery } from '../redux/api'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, setProducts } from '../redux/reducer'
import Header from './Header'

const Client = () => {
    const { data: apiData, isLoading, isSuccess, isError } = useAllProductsQuery()
    const dispatch = useDispatch()
    const { products, totalItems, cart } = useSelector((state) => state?.myReducer)
    useEffect(() => {
        if (apiData && !isLoading) {
            dispatch(setProducts(apiData))
        }
    }, [apiData])

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div>
            <Header />
            <div className="prodcuts-conatiner">
                {/* <div className="product">
                    <img src={trolley} alt="" />
                    <hr />
                    <h1>Red Tshirt</h1>
                    <h2>Rs: 3,000</h2>
                    <button>Add To Cart</button>
                </div> */}
                
                {products?.data?.map((item, index) => {
                    const cartItem = cart.find(cartItem => cartItem._id === item._id);
                    const isDisabled = cartItem && cartItem.quantity >= item.productQuantity || item?.productQuantity === 0;

                    return (
                        <div className="product" key={index}>
                            <img src={item?.productImage} alt="" />
                            <hr />
                            <h1>{item?.productName}</h1>
                            <h2>Rs: {item?.productFinalPrice} {item?.productDiscount !== 0 ? `(${item?.productDiscount + "% Discount)"}` : ""}</h2>
                            <button
                                onClick={() => dispatch(addToCart({
                                    productImage: item.productImage,
                                    productName: item.productName,
                                    productFinalPrice: item.productFinalPrice,
                                    _id: item._id
                                }))}
                                disabled={isDisabled} // Disable the button if the condition is true
                            >
                                {isDisabled ? "Out of Stock" : "Add To Cart"}
                            </button>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default Client
