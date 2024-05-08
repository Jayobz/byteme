import React, { useState } from 'react';
import './nav.css';
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import FavoritesCounter from '../Products/FavoritesCounter';
import AdminMenu from '../Admin/AdminMenu.jsx'


const Nav = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const [dropOpen, setDropOpen] = useState(false);
    const [showSide, setShowSide] = useState(false);

    const toggleDropDown = () => {
        setDropOpen(!dropOpen)
    }
    const toggleSideBar = () => {
        setShowSide(!showSide)
    }
    const closeSideBar = () => {
        setShowSide(false)
    }


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [ logoutApiCall ] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()

            dispatch(logout());
            navigate('/login');
        }
        catch (error) {
            console.error(error)
        }
    }

  return (
    <div style={{zIndex: 998}} className={`flex p-4 text-[#2e2a27] bg-[#e3eae0] items-center`} id='navigation-container'>
        
        {userInfo && userInfo.isAdmin && <div className='mr-[3rem]'>
                    <AdminMenu />
                </div>}
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className='h-[120px] w-[120px]'
                                 width="1280.000000pt" height="552.000000pt" viewBox="0 0 1280.000000 552.000000"
                                 preserveAspectRatio="xMidYMid meet">
                                
                                <g transform="translate(0.000000,552.000000) scale(0.100000,-0.100000)"
                                fill="#2e2a27" stroke="none">
                                <path d="M1212 2700 l0 -1080 947 2 946 3 45 23 c25 13 64 48 87 77 l43 52 0
                                366 0 366 -63 45 c-93 67 -100 75 -81 111 8 17 39 55 68 85 30 30 59 65 65 77
                                7 15 11 146 11 417 l0 396 -52 40 c-28 23 -65 48 -82 57 -82 42 -91 43 -1033
                                43 l-902 0 1 -1080z m1632 894 c33 -9 73 -23 88 -32 55 -32 58 -53 58 -370 l0
                                -291 -41 -48 c-59 -70 -95 -102 -124 -113 -17 -6 -270 -10 -676 -10 l-649 0 0
                                440 0 440 641 0 c554 0 649 -2 703 -16z m23 -1083 c120 -96 123 -106 123 -377
                                l0 -217 -25 -33 c-14 -19 -52 -46 -83 -61 l-57 -28 -662 -3 -663 -2 0 380 0
                                380 659 0 659 0 49 -39z"/>
                                <path d="M6438 3759 c-23 -13 -26 -120 -5 -138 10 -7 167 -12 523 -13 l509 -3
                                3 -988 2 -988 133 3 132 3 3 988 2 987 468 0 c257 0 472 4 478 8 18 12 41 66
                                36 87 -2 11 -13 30 -25 43 l-20 22 -1111 0 c-736 -1 -1117 -4 -1128 -11z"/>
                                <path d="M3736 3744 c-3 -9 -6 -33 -6 -54 0 -46 -1 -45 400 -430 348 -335 508
                                -489 657 -636 l123 -121 0 -441 0 -442 135 0 136 0 -3 423 c-3 376 -1 426 14
                                459 16 37 29 51 174 187 44 41 203 194 354 340 151 146 333 322 405 391 241
                                233 235 226 235 274 0 23 -5 47 -12 54 -8 8 -47 12 -108 12 -91 0 -100 -2
                                -136 -28 -36 -26 -119 -105 -544 -517 -85 -83 -220 -213 -300 -290 -80 -77
                                -146 -143 -148 -147 -2 -3 -19 -18 -37 -33 l-35 -26 -147 143 c-154 150 -352
                                342 -563 545 -402 389 -353 353 -485 353 -85 0 -104 -3 -109 -16z"/>
                                <path d="M3773 2138 c-23 -11 -23 -13 -23 -224 0 -134 4 -222 11 -237 6 -14
                                28 -34 49 -46 36 -20 50 -21 316 -21 302 1 322 4 387 56 l37 29 0 214 c0 192
                                -2 215 -17 227 -23 17 -152 18 -188 2 l-25 -11 0 -163 0 -162 -35 -31 c-35
                                -31 -37 -31 -144 -31 -94 0 -112 3 -135 21 l-26 20 0 165 c0 203 -1 204 -112
                                203 -40 0 -83 -5 -95 -11z"/>
                                </g>
        </svg>
                  
                 
        <div className="flex flex-row justify-between items-center w-full">
            <div className='w-[20%] flex flex-row justify-evenly items-center'>
                <Link to='/' className='flex relative'>
                    <div className='flex items-center transition-transform transform hover:translate-x-4'> 
                        <span className="block nav-item-name ">Home</span>
                    </div>
                </Link>

                <Link to='/products' className='flex relative'>
                    <div className='flex items-center transition-transform transform hover:translate-x-2'>
                        <span className="block nav-item-name">Products</span>
                    </div>
                </Link>
            </div>
            
            <div className='w-[10%] flex flex-row justify-evenly items-center'>
                <Link to='/cart' className='flex relative'>
                    <div className='block items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineShoppingCart className='mr-2' size={26} />
                    </div>

                    <div className='absolute top-0'>{cartItems.length > 0 && (
                        <span className='px-1 py-0 text-white bg-red-700 rounded-full h-[10rem] w-[10rem]'>
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                    )}</div>
                </Link>


                <Link to='/favorites' className='flex relative'>
                    <div className='flex items-center transition-transform transform hover:translate-x-2'>
                        <FaHeart className='mr-2' size={26} />
                        <FavoritesCounter />
                    </div>
                </Link>


                {!userInfo && (
                <ul className='flex flex-row items-center ml-[1rem]'>
                    <li>
                        <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Register</span>
                        </Link>
                    </li>

                    
                </ul>
                )}
                
                
                
            </div>
            
        </div>




        <div className="relative flex items-center">
            <button onClick={toggleDropDown} className='flex items-center text-gray-8000 focus:outline-none'>

            {userInfo ? <span className='text-[#2e2a27]'>{userInfo.username}</span> : (<></>)}

            {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2e2a27"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
          
                
            </button>


            {dropOpen && userInfo && (
                <ul className={`absolute right-0 mt-2 mr-6 space-y-2 bg-white text-gray-600 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${!userInfo.isAdmin ? '-bottom-20' : '-bottom-40'} z-[1000]`}>

                    {userInfo.isAdmin && (
                        <>
                      
                            <Link to="/admin/orderlist" className='block px-4 py-2 hover:bg-gray-100 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'>Order</Link>
                            <Link to="/admin/userlist" className='block px-4 py-2 hover:bg-gray-100 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'>Users</Link>
                            

                            
                        </>
                        
                    )}

                    <Link to="/profile" className='block px-4 py-2 hover:bg-gray-100 '>Profile</Link>
                    <button onClick={logoutHandler}
                    className='block px-4 py-2 hover:bg-gray-100 hover:sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'>Logout</button>
                </ul>
                
            )}
            
            
        </div>
        



           


        
    </div>
  )
}

export default Nav;
