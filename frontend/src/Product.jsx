import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilteredProductsQuery } from './redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from './redux/api/categoryApiSlice.js';

import { setCategories, setProducts, setChecked } from './redux/features/shop/shopSlice.js';
import Loader from './components/Loader.jsx';
import ProductCard from './pages/Products/ProductCard.jsx';

const Product = () => {
  const dispatch = useDispatch()
  const { categories, products, checked, radio } = useSelector((state) => state.shop)

    const categoriesQuery = useFetchCategoriesQuery()
    const [ priceFilter, setPriceFilter ] = useState('')

    const filteredProductsQuery = useGetFilteredProductsQuery({
      checked,
      radio,
    })

    useEffect(() => {
      if (!categoriesQuery.isLoading) {
        dispatch(setCategories(categoriesQuery.data))
      }
    }, [categoriesQuery.data, dispatch])


    useEffect(() => {
      if (!checked.length || !radio.length) {
        if (!filteredProductsQuery.isLoading) {
          const filteredProducts = filteredProductsQuery.data.filter((product) => {
            return (
              product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
            )
          })

          dispatch(setProducts(filteredProducts));
        }
      }
    }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);




    const handleBrandClick = (brand) => {
      const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand)
      dispatch(setProducts(productsByBrand))
    }


    const handleCheck = (value, id) => {
      const updatedCheck = value ? [...checked, id] : checked.filter((c) => c !== id)
      dispatch(setChecked(updatedCheck))
    }


    const uniqueBrands = [...Array.from(
      new Set(filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined))
    )];


    const handlePriceChange = (e) => {
      setPriceFilter(e.target.value)
    }


    



  return (
    <>
     <h2 className="h4 text-left  mx-[8rem] font-semibold text-5xl mt-[7rem]">
              {products?.length} Products
            </h2>
      <div className="container ">
        <div className="flex md:flex-row">
          <div className="p-3">
           

            <div className="flex w-[90%] pl-[4rem]">
              <div className="h-[100vh] w-[100vw] flex items-center flex-wrap">
                {products.length === 0 ? (
                    <Loader />
                ) : (
                  products?.map((pro) => (
                    <div className='p-3 m-[1rem] shadow-lg ring-opacity-25 ring-offset-32' key={pro._id}>
                      <ProductCard pro={pro} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>



          <div className='bg-[#ffffff] p-3 mt-2 mb-2 absolute right-0 top-[7rem] w-[18rem]'>
            <h2 className='h4 text-center py-2 bg-white rounded-full mb-2'>Filter by Categories</h2>

            <div className="p-5 w-[15rem]">
              {categories?.map((cat) => (
                <div key={cat._id} className='mb-2'>
                  <div className='flex items-center mr-4'>
                    <input type="checkbox" className='w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black dark:focus:ring-gray-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer'
                    onChange={(e) => handleCheck(e.target.checked, cat._id)}/>
                    
                    <label htmlFor="checkbox" className='ml-2 text-sm font-medium text-black dark:text-[gray]'>{cat.name}</label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center bg-white py-2 rounded-full mb-2" >Filter by Brands</h2>


            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className='flex items-center mr-4 mb-5'>
                    <input className='' type="radio" id={brand} name='brand' onChange={() => handleBrandClick(brand)}/>

                    <label htmlFor="radio" className='ml-2 text-black font-medium text-sm dark:text-gray-300'>{brand}</label>
                  </div>
                </>
              ))} 
            </div>

            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">Filter by Price</h2>

            <div className='p-5 w-[15rem]'>
              <input type="number" placeholder='Enter Price' value={priceFilter} onChange={handlePriceChange} className='w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-black'/>
            </div>

            <div className="p-5 pt-0">
              <button className='w-full border my-4' onClick={() => window.location.reload()}>Reset</button>
            </div>
          </div>

          
        </div>
      </div>
    </>
  )
}

export default Product
