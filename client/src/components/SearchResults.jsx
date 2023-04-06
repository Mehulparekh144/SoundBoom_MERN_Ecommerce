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
                    className='absolute w-full  h-[50vh] rounded-xl overflow-x-hidden overflow-y-auto bg-gray-200 px-4 py-2 z-50 mt-2  '>
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
