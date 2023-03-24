import React from 'react'
import { motion } from 'framer-motion'
import ProductItem from './ProductItem'
import FilterProductItem from './FilterProductItem'

const SearchResults = ({ isOpen, filteredProducts }) => {
    return (
        <>
            {
                filteredProducts.length > 0 &&
                <motion.div
                    initial={{ opacity: 0, y: "-1vh" }}
                    animate={isOpen ? { opacity: 1, y: 0 } : ''}
                    exit={{ opacity: 0, y: "-1vh" }}
                    className='absolute w-full  md:w-max h-[50vh] rounded-b-xl overflow-x-hidden overflow-y-scroll bg-gray-200 px-4 py-2 z-50 left-0 md:left-[23rem]'>
                    {filteredProducts.length > 0 && filteredProducts.map((product, key) => (
                        <div key={key} className="">
                            <FilterProductItem product={product} />

                        </div>

                    ))}
                </motion.div>
            }
        </>
    )
}

export default SearchResults
