import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import Load from '../../components/Load'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {
    const [ username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const { userInfo } = useSelector(state => state.auth)


    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();



    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email, userInfo.username])



    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            toast.error('Password does not match')
        }
        else {
            if (confirmPassword.length < 8){
                toast.error('Passwords must exceed 8 characters')
                return
            }
            else {
                try {
                    const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
                    dispatch(setCredentials({...res}))
                    toast.success("User Profile updated!")
                }
                catch (error) {
                    toast.error(error?.data?.message || error.message)
                }
            }
        }
    }


    
  return (
    <div className='container mx-auto p-4 flex items-center justify-center h-[100vh] flex-col'>
         <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>
      <div className="flex justify-center align-center w-[100vw]">
       

            <div className="md:w-1/3">
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-black mb-2">Name</label>

                        <input type="text" placeholder='Enter Name' value={username} onChange={(e) => setUsername(e.target.value)} className='form-input p-4 rounded-sm w-full text-center'/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2">Email</label>

                        <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-input p-4 rounded-sm w-full text-center'/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2">Password</label>

                        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-input p-4 rounded-sm w-full text-center'/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-2">Confirm Password</label>

                        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-input p-4 rounded-sm w-full text-center'/>
                    </div>


                    <div className="flex justify-between">
                        <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-[gray]">Update</button>


                        <Link to='/user-orders' className="bg-black text-white py-2 px-4 rounded hover:bg-[gray]">My Orders</Link>
                    </div>
                </form>
            </div>

            {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  )
}

export default Profile;
