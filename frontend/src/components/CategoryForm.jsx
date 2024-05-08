import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit, buttonText = 'Submit', handleDelete}) => {
  return (
    <div className='p-3'>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input type="text" className='py-3 px-4 border rounded-lg w-full' placeholder='Category Name' value={value} onChange={(e) => setValue(e.target.value)}/>

        <div className="flex justify-between">
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                {buttonText}
                </button>

                {handleDelete && (<button  onClick={handleDelete} className='bg-black text-white py-2 px-4 rounded-lg hover:bg-grayfocus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50'>Delete</button>)}
        
        </div>
      </form>
    </div>
  )
}

export default CategoryForm