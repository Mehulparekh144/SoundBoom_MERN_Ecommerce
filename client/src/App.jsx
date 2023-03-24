import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserContextProvider } from './context/userContext'
import Layout from './Layout'
import { AlertContextProvider } from './context/alertContext'
import Account from './pages/Account'
import AddProduct from './pages/AddProduct'
import AdminOrders from './pages/AdminOrders'
import Orders from './pages/Orders'
import Users from './pages/Users'
import AdminProducts from './pages/AdminProducts'
import Payment from './pages/Payment'
import { useSelector } from 'react-redux'
import NotFound from './pages/NotFound'
import CheckOutSuccess from './pages/CheckOutSuccess'

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
        <AlertContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/account' element={<Account />} />
                <Route exact path='/account/addproduct' element={<AddProduct />} />
                <Route exact path='/account/orders' element={<AdminOrders />} />
                <Route exact path='/account/users' element={<Users />} />
                <Route exact path='/account/products' element={<AdminProducts />} />
                <Route exact path='/payment' element={<Payment />} />
                <Route exact path='/orders' element={<Orders />} />
                <Route exact path='/checkout-success?payment_success' element={<CheckOutSuccess />} />
                <Route  path='*' element={<NotFound/>} />
              </Route>
            </Routes>

          </UserContextProvider>
        </AlertContextProvider>
    </AnimatePresence>

  )
}

export default App
