import React from 'react'
import { useFolderContext } from '../context/FolderContext'

const Breadcrumbs = () => {

  const {breadcrumbs, openFolder} = useFolderContext();


  return (
    <div className='flex items-center gap-2 text-sm text-gray-700 p-2'>
     {breadcrumbs.map((crumbs, idx)=>(
      <div key={crumbs.id} className='flex items-center gap-2' >
        <span className="cursor-pointer hover:underline" onClick={()=>openFolder(crumbs.id)}>{crumbs.name}</span>
        {idx != breadcrumbs.length - 1 && <span className='text-gray-400'>/</span>}
      </div>
     ))}
    </div>
  )
}

export default Breadcrumbs
