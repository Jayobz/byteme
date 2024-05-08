import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


import React from 'react'

const AdminMenu = () => {
    const [ isMenuOp, setIsMenuOp ] = useState(false)
    const toggle = () => {
        setIsMenuOp(!isMenuOp)
    }


  return (
    <>
        <button className={`z-[999] bg-[transparent] p-2 block rounded-kg`} onClick={toggle}>
            {
                isMenuOp ? (
                    <FaTimes color='black' />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                        <div className="w-6 h-0.5 bg-black my-1"></div>
                    </>  
                )
            }
        </button>

        {isMenuOp && (
            <section className="bg-[#e8e8ed] p-4 fixed left-[7rem] top-[5rem] z-[999] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className='list-tem py-2 px-3 block mb-5 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-sm' to='/admin/dashboard' style={({isActive}) => ({
                            color: isActive ? 'red' : 'black',
                        })}>
                            Admin Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='list-tem py-2 px-3 block mb-5 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-sm' to='/admin/categorylist' style={({isActive}) => ({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Create Category
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='list-tem py-2 px-3 block mb-5 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-sm' to='/admin/productlist' style={({isActive}) => ({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Create Product
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='list-tem py-2 px-3 block mb-5 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-sm' to='/admin/allproductslist' style={({isActive}) => ({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Product List
                        </NavLink>
                    </li>


                    <li>
                        <NavLink className='list-tem py-2 px-3 block mb-5 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-sm' to='/admin/userlist' style={({isActive}) => ({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Manage Users
                        </NavLink>
                    </li>


                    <li>
                        <NavLink className='list-tem py-2 px-3 block mb-5 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-sm' to='/admin/orderlist' style={({isActive}) => ({
                            color: isActive ? 'green' : 'black',
                        })}>
                            Manage Orders
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}
    </>
  )
}

export default AdminMenu;
