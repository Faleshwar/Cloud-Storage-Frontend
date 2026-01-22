import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link, Route, Routes } from 'react-router-dom'
import MyDrive from '../components/MyDrive'
import SharedWithMe from '../components/SharedWithMe'
import Trash from '../components/Trash'
import Upload from '../components/Upload'
import Login from './Login'
import ModalRenderer from '../components/modals/ModalRenderer'
import StarredFiles from '../components/StarredFiles'


const Workspace = () => {

 

  return (
    <div className="h-screen w-screen flex bg-gray-50">
    <Sidebar/>
     <div className='flex-1 p-5'>
    <Routes>
        <Route path="/" element={<MyDrive />} />
        <Route path='/upload' element={<Upload/>}/>
        <Route path="/my-files" element={<div className='p-5'>My Files Content</div>} />
        <Route path="/shared" element={<SharedWithMe/>} />
        <Route path="/trash" element={<Trash/>} />
        <Route path='/starred' element={<StarredFiles/>}/>
     </Routes>
     <ModalRenderer/>
     </div>
    </div>
  )
}

export default Workspace
