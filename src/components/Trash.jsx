import React, { useEffect, useState } from 'react'
import { useFolderContext } from '../context/FolderContext'
import folderIcon from '../assets/folder.png'
import axios from 'axios'
import { BACKEND_URL } from '../Util'
import { useUIContext } from '../context/UIContext'
import fileIcon from '../assets/file.png'
import Spinner from './Spinner'
import { useFileContext } from '../context/FileContext'

const Trash = () => {

  const { files, folders, getTrashedItems, setFolders, loading, deleteFolder , setFiles, restoreFolder} = useFolderContext();
  const {restoreFile} = useFileContext();

  const { showToast } = useUIContext();

  const fetchData = (e) => {
    e.preventDefault();
    getTrashedItems();
  }

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  let fileName = "MyResume";



  const handleRestore = async (e, itemId, type) => {
    console.log(files, folders)
    console.log(itemId)
    e.preventDefault();
    if (type === "folder") {
      try {
        const res = await restoreFolder(itemId);
        setFolders(folders.filter(f => f.id !== itemId));
        showToast("success", "Restoring folder success");
      } catch (err) {
        showToast("error", "Restoring folder error")
        console.error(err);
      }
    }else{
      try{
        const res = await restoreFile(itemId);
        setFiles(files.filter(f => f.id !== itemId));
        showToast("success", res.data.message);
      } catch (err) {
        showToast("error", err.response.data.message)
        console.error(err.response);
      }
    }
  }

  useEffect(() => {
    getTrashedItems();
  }, [])

  if (loading) return <Spinner />

  return (
    <div className='h-screen overflow-auto'>
      <div>Folders</div>
      {folders && folders.map((f) => (
        <div key={f.id} className="flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer">
          <img src={folderIcon} alt="folder" className='w-8 h-8' />
          <div className='flex-1 text-gray-400'>{f.name}</div>
          <div className=''></div>
          <button onClick={(e) => handleRestore(e, f.id, "folder")} className='hover:font-medium cursor-pointer'>Restore</button>
        </div>
      ))}

      <div>Files</div>
      {files && files.map((file) => (
        <div key={file.id} className={`flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer`}>
          <img src={fileIcon} alt="file" className='w-8 h-8' />
          <div className='flex-1'>{file.name}</div>
          <div className='text-sm text-gray-500'>{file.modified}</div>
          <div className='text-sm text-gray-500'>{`${Math.floor(file.size / 1024)}KB`}</div>
          <button onClick={(e) => handleRestore(e, file.id, "file")} className='hover:font-medium cursor-pointer'>Restore</button>
        </div>
      ))}
    </div>
  )
}

export default Trash
