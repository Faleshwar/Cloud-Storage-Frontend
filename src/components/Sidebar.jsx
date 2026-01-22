import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useFolderContext } from '../context/FolderContext';
import { useUIContext } from '../context/UIContext';

const Sidebar = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const {currentFolderId} = useFolderContext();
  const {openModal} = useUIContext();

  const handleLogout = ()=>{
    auth.logout();
    navigate("/login");
  }

  
 
  return (
    <div className="w-60 h-screen text-black p-5 border-r">
        <div className='h-1/3 border-b-2 border-gray-800 pb-2 mb-2'>
            <h2 className='text-xl font-bold mb-4'>Cloud Storage</h2>
            <ul className='list-none'>
                <li className='mb-2 cursor-pointer hover:font-medium'>
                  <button onClick={()=>openModal("createFolder")} className='text-amber-400 hover:font-semibold'>Create Folder</button>
                </li>
                <li className='mb-2 cursor-pointer hover:font-medium'><Link to="/">My Drive</Link></li>
                <li className='mb-2 cursor-pointer hover:font-medium'><Link to="/upload">Upload</Link></li>
                <li className='mb-2 cursor-pointer hover:font-medium'><Link to="/starred">Starred Files</Link></li>
                <li className='mb-2 cursor-pointer hover:font-medium'><Link to="/shared">Shared with Me</Link></li>
                <li className='mb-2 cursor-pointer hover:font-medium'><Link to="/trash">Trash</Link></li>
                <li className='mb-2 cursor-pointer hover:font-medium'><Link onClick={()=>handleLogout()} to="/logout" className="">Log out</Link></li>
            </ul>
        </div>  
    </div>
  )
}

export default Sidebar
