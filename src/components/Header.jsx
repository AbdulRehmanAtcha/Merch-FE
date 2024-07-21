import React from 'react'
import { Link } from 'react-router-dom'
import trolley from "../assets/trolley.png"
import { useSelector } from 'react-redux'


const Header = () => {
    const { totalItems } = useSelector((state) => state?.myReducer)

    return (
        <div className="header">
            <h1>XYZ Store</h1>
            <Link to={"/cart"}>
                <div className='badge-parent'>
                    <img src={trolley} alt="Cart" style={{ height: "30px", width: "30px" }} />
                    <div className="badge">
                        {totalItems}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Header
