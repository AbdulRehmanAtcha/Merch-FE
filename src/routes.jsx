import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Admin from './components/Admin'
import AddProduct from './components/AddProduct';
import Client from './components/Client';
import Cart from './components/Cart';
import Sheet from './components/Sheet';
import Ledger from './components/Ledger';

const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Client />
        },
        {
            path: "/sheet",
            element: <Sheet />
        },
        {
            path: "/admin",
            element: <Admin />
        },
        {
            path: "/add-product",
            element: <AddProduct />
        },
        {
            path: "/cart",
            element: <Cart />
        },
        {
            path: "/ledger",
            element: <Ledger />
        },
    ]);
}

export default Routes