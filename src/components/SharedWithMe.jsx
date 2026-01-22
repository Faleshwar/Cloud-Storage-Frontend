import React, { useEffect } from 'react'
import { useFolderContext } from '../context/FolderContext';
import fileIcon from '../assets/file.png'
import Spinner from './Spinner';

const SharedWithMe = () => {
  const fileContext = useFolderContext();


  useEffect(()=>{
    fileContext.sharedWithMeFiles();
  }, [])

  if(fileContext.loading) return <Spinner/>

  return (
    <div className='h-screen overflow-auto'>
        <p>Files shared with me will appear here.</p>
        {fileContext.files && fileContext.files.map((file)=>(
                        <div key={file.id} className={`flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer `}
                        >
                            <img src={fileIcon} alt="file" className='w-8 h-8'/>
                            <div className='flex-1'>{file.name}</div>
                            <div className='flex-2'>sharedBy: {file.ownerName}</div>
                            <div className='text-sm text-gray-500'>{file.modified}</div>
                            <div className='text-sm text-gray-500'>{`${Math.floor(file.size/1024)}KB`}</div>
                        </div>
                    ))}
    </div>
  )
}

export default SharedWithMe
