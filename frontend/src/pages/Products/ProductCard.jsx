import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice.js';
import { toast } from 'react-toastify';
import HeartIcon from './HeartIcon';



const ProductCard = ({pro}) => {
    const dispatch = useDispatch()

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}));
        toast.success('ADDED SUCCESSFULLY')
    }



  return (
    <div className='max-2-sm h-[24rem] w-[15rem] relative bg-[#1a1a1a] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
      <section className='relative'>
        <Link to={`/product/${pro._id}`}>
            <span className='absolute bottom-3 right-3 bg-black text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[gray] dark:text-black'>
                {pro?.brand}
            </span>

            <img src={pro.image} alt={pro.name} style={{height: '220px', objectFit: 'cover'}} className='cursor-pointer w-full'/>
        </Link>
        <HeartIcon product={pro}/>
      </section>


      <div className="p-5 ">
        <div className="flex justify-between">
            <h5 className="mb-2 text-white text-xl dark:text-white">{pro.name}</h5>

            <p className="text-white font-semibold">
                {pro?.price?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </p>
        </div>

        <p className="mb-3 font-normal text-[#cfcfcf]">
            {pro?.description?.substring(0, 60)}...
        </p>

        <section className='flex justify-between items-center'>
            <Link to={`/product/${pro._id}`} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-[gray] focus:ring-4 focus:outline-none focus:ring-black dark:bg-[gray] dark:hover:bg-gray-600 dark:focus:ring-black'>Read more
            
            <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M1 5h12m0 0L9 1m4 4L9 9'></path>
            </svg>    
            </Link>

            <button className='p-2 rounded-full text-white' onClick={() => addToCartHandler(pro, 1)}>
                <AiOutlineShoppingCart size={25}/>
            </button>
        </section>
      </div>
    </div>
  )
}

export default ProductCard
