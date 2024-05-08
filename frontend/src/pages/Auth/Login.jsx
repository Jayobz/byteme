import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import Block from '../../components/Block'




const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const { userInfo }  = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
        }
        catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


  return (
  <>
   

    <Block />
  


    <div className='bg-[#131417] h-[100vh] flex items-center justify-center main-cont'>
        <section className="pl-[5rem] pb-[5rem] flex flex-wrap w-[60%] bg-[#e3eae0] z-[1]">
            <div className="mr-[4rem] mt-[4rem]">
                <h1 className="text-2xl font-semibold mb-4">Sign in</h1>


                <form onSubmit={submitHandler} className='container w-full flex justify-center items-center flex-col'>

                    <div className='my-[1rem]'>
                        <label htmlFor="email" className='block text-sm font-medium text-[#e8e2da]'>Email</label>

                        
                        <input type="email" id='email' className='mt-1 p-2 border rounded w-full border-[black]' value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                    </div>


                    <div className='my-[1rem]'>
                        <label htmlFor="password" className='block text-sm font-medium text-[#e8e2da]'>Password</label>


                        <input type="password" id='password' className='mt-1 p-2 border rounded w-full border-[black]' style={{ backgroundColor: '#e8e2da' }} value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>



                    <button disabled={isLoading} type='submit' className='bg-[#000000] text-white px-4 py-2 cursor-pointer my-[1rem] hover:border rounded  hover:bg-[#f8f8f8] hover:border-[black] hover:text-black '>{isLoading ? "Logging in..." : "Login"}</button>

                    {isLoading && <Loader />}
                </form>





                <div className="mt-4">
                    <p className='text-[black]'>
                        Don't have an account? {" "} 
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'} 
                            className='text-pino-500 hover:underline'
                            >
                            Register
                        </Link>
                    </p>
                </div>

            </div>
            
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className='h-[200px] w-[200px] ml-[190px] mt-[120px]'
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
        </section>
        
      
    </div>
    </>
  )
}

export default Login;
