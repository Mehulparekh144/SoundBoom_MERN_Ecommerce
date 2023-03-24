import React, { useState } from 'react'
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'
import {motion} from 'framer-motion'
import Alert from '../components/Alert'
import { Navigate, redirect } from 'react-router-dom'

const Home = () => {
    return (
        <motion.div
        initial= {{opacity : 0,y : "-100vh"}}
        animate= {{opacity: 1,y:0}}
        exit = {{opacity: 0 ,y : "-100vh"}}
        transition={{type:'spring' , bounce : 0.3 }}
        
        >
            <Banner/>
            <ProductList/>


        </motion.div>

    )
}

export default Home
