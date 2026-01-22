import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center py-10'>
        <div className='w-6 h-6 border-2 border-gray-500 border-t-blue-500 rounded-full animate-spin'></div>
    </div>
  )
}

export default Spinner
