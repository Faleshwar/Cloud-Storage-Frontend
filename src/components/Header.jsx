import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='w-full h-16 bg-gray-800 text-white flex items-center px-5'>
            <ul className='flex space-x-6'>
                <li><a href="#" className="hover:text-gray-300">Home</a></li>
                <li><a href="#" className="hover:text-gray-300">Settings</a></li>
                <li><a href="#" className="hover:text-gray-300">Profile</a></li>
                <li><a href="#" className="hover:text-gray-300">Help</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Header
