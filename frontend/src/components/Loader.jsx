import React from 'react'

const Loader = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex item-center'>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
    </div>
  )
}

export default Loader
