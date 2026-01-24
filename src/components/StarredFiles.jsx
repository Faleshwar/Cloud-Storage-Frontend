import React, { useEffect, useState } from 'react'
import { useFolderContext } from '../context/FolderContext'
import fileIcon from "../assets/file.png"
import Spinner from './Spinner';
import { useUIContext } from '../context/UIContext';

const StarredFiles = () => {
    const {files, setFiles, starredFiles, unmarkStar, loading} = useFolderContext();
    const {showToast} = useUIContext();

    const handleUnmarkStar = async (e, fileId)=>{
        e.preventDefault();
        try{
            await unmarkStar(fileId);
            setFiles(files.filter(f=>f.id!==fileId));
            showToast("success", "Unmarked star success")
        }catch(err){
            showToast("error", "Unmarking star error")
            console.error(err);
        }
    }

    useEffect(()=>{
        starredFiles();
    }, [])

    if(loading) return <Spinner/>

  return (
    
    <div className='h-screen overflow-auto'>
        {files && files.map((file)=>(
                        <div key={file.id} className={`flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer`}
                        >
                            <img src={fileIcon} alt="file" className='w-8 h-8'/>
                            <div className='flex-1'>{file.name}</div>
                            <div className='flex-2'>
                                <i onClick={(e)=>handleUnmarkStar(e,file.id)} className="fa-solid fa-star cursor-pointer"></i>
                            </div>
                            <div className='text-sm text-gray-500'>{file.mimeType.toString().includes("audio")?`${(file.size/(1024*1024)).toFixed(2)}MB`:`${(file.size/1024).toFixed(2)}KB`}</div>
                        </div>
                    ))}
    </div>
  )
}

export default StarredFiles
