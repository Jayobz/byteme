import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAllProductsQuery } from '../../redux/api/productApiSlice.js'
import Loader from '../../components/Loader'



const AllProducts = () => {
    const {data: products, isLoading, isError} = useAllProductsQuery()

    if(isLoading) {
        return <Loader />
    }
    if (isError) {
        return <div>Error Loading</div>
    }



  return (
    <div className='container mx-[9rem] '>
        <div className="flex flex-col md:flex-row">
            <div className="p-3">
                <div className="ml-[2rem] text-xl font-bold h-12">
                    All Products ({products.length})
                </div>

                <div className="flex flex-wrap justify-around items-center xl:gap-x-[100px]">
                    {products.map((product) => (
                        <Link key={product._id} to={`/admin/product/update/${product._id}`} className='block mb-4 overflow-hidden'>
                            {
                                <div className="flex">
                                    <img src={product.image} alt={product.name}  className='w-[10rem] object-cover'/>

                                    <div className="p-4 flex flex-col justify-around">
                                        <div className="flex justify-between">
                                            <h5 className='text-xl font-["DM Sans", sans-serif] mb-2'>
                                                {product?.name}
                                            </h5>

                                            <p className="text-black text-sm">
                                                {moment(product.createAt).format('MMM Do YYYY')}
                                            </p>
                                        </div>

                                        <p className="text-black xl:w-[20rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4 px-[2rem]">
                                            {product?.description?.substring(0, 160)}
                                        </p>


                                        <div className="flex justify-between">
                                            <Link to={`/admin/product/update/${product._id}`} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[black] rounded-lg hover:bg-[#e8e8ed] hover:text-black focus:ring-4 focus:outline-none focus:ring-[black] dark:bg-[white] dark:hover:bg-[purple]'>
                                                Update Product 
                                                <svg className='w-3.5 h-5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
                                                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m1 5h12m0 0L9 1m4 4L9 9'/>
                                                </svg>
                                            </Link>

                                            <p>$ {product?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Link>
                    ))}
                </div>
            </div>
            <div className='md:w-1/4 p-3 mt-2'>
            </div>
        </div>
      
    </div>
  )
}

export default AllProducts
