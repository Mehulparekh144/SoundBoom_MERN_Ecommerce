// import React, {  useEffect, useState } from 'react'
// import DropDown from './DropDown'
// import ProductItem from './ProductItem'
// import {useDispatch, useSelector} from 'react-redux'
// import { fetchProducts } from '../store/productSlice'



// const ProductList = () => {

//     const dispatch = useDispatch()    
//     const [selectedType, setSelectedType] = useState('All')
//     const [selectedPrice, setSelectedPrice] = useState('All')
//     const {data : products , status } = useSelector((state)=>state.product)

//     const handleTypeChange = (type)=>{
//         setSelectedType(type)
//     }

//     const handlePriceChange = (type)=>{
//         setSelectedPrice(type)
//     }

//     const filteredProducts = products.filter(product=>{

//     })


//     useEffect(()=>{
//         dispatch(fetchProducts())
//         },[])

//     return (
//         <div>
//             <div className='my-5 flex gap-6'>
//                 <DropDown title="Type of headphones"  items={["All", "Wired", "Wireless"]} />
//                 <DropDown title="Price" items={["All", ">1000K", "1000K-3000K", "<3000K"]} />
//             </div>
//             <div className='mt-7'>
//                 <h1 className='text-3xl font-semibold text-primary'>Our Products</h1>
//                 <div className='mt-3 md:flex gap-4 justify-start flex-wrap'>
//                     {products && products.length > 0 && products.map((product, index) => (
//                         <ProductItem key={index} product={product} />
//                     ))}
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default ProductList
import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productSlice'

const ProductList = () => {

    const dispatch = useDispatch()
    const { data: products, status } = useSelector((state) => state.product)

    const [selectedType, setSelectedType] = useState('All')
    const [selectedPrice, setSelectedPrice] = useState('All')

    const handleTypeChange = (type) => {
        setSelectedType(type)
    }

    const handlePriceChange = (price) => {
        setSelectedPrice(price)
    }

    
    const filteredProducts = products.filter(product => {
        
        if (selectedType !== 'all' && product.type !== selectedType) {
            return false
        }
        
        if (selectedPrice !== 'all') {
            const productPrice = parseInt(product.price)
            
            if (selectedPrice === '<₹1000' && productPrice>= 1000) {
                return false
            }
            else if (selectedPrice === '>₹3000' && productPrice <= 3000) {
                return false
            }
            else if (selectedPrice === '₹1000-₹3000' && (productPrice < 1000 || productPrice > 3000)) {
                return false
            }
        }
        
        return true
    })



    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <div>
            <div className='my-5 flex gap-6'>
                <DropDown title='All' items={['All', 'Wired', 'Wireless']} onSelect={handleTypeChange} />
                <DropDown title='All' items={['All', '<₹1000', '₹1000-₹3000' , '>₹3000']} onSelect={handlePriceChange} />
            </div>
            <div className='mt-7'>
                <h1 className='text-3xl font-semibold text-primary'>Our Products</h1>
                <div className='mt-3 md:flex gap-4 justify-start flex-wrap'>
                    {filteredProducts.length>0?filteredProducts.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    )):products.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList
