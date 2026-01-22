import React, { useState } from 'react'
import { useFolderContext } from '../../context/FolderContext';
import { useUIContext } from '../../context/UIContext';

const CreateFolderModal = ({onClose }) => {

    const [folderName, setFolderName] = useState("");
    const {createFolder, folders, setFolders} = useFolderContext();
    const {showToast} = useUIContext();

    const handleCreateFolder = async (e)=>{
        e.preventDefault();
        try{
            const res = await createFolder(folderName);
            setFolders([...folders, {id:folderName, name:folderName}])
            showToast("success", "Folder created successfully");
        }catch(err){
            showToast("error", "Folder creating error");
            console.error(err);
        }finally{
            onClose();
        }
    }



  return (
    <div className='bg-white p-4 rounded w-96'>
      <h2 className='text-lg font-semibold'>Create Folder</h2>

      <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} className='border w-full mt-2 p-2' />

      <div className='flex justify-end gap-2 mt-4'>
        <button className='bg-black text-white py-2 px-4 cursor-pointer' onClick={onClose}>Cancel</button>
        <button className='disabled:bg-gray-300 bg-blue-400 py-2 px-4 cursor-pointer' disabled={!folderName || folderName.trim().length === 0} onClick={handleCreateFolder}>Save</button>
      </div>
    </div>
  )
}

export default CreateFolderModal
