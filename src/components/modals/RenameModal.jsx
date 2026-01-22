import React, { useState } from 'react'
import { useUIContext } from '../../context/UIContext';
import { useFolderContext } from '../../context/FolderContext';
import { useFileContext } from '../../context/FileContext';

const RenameModal = ({ item, onClose }) => {

  const [name, setName] = useState(item.item.name);
  const { showToast } = useUIContext();
  const { renameFolder, files, folders, setFiles, setFolders } = useFolderContext();
  const {rename} = useFileContext();

  const handleRename = async (e) => {
    e.preventDefault();
    if (item.type === "folder") {
      try {
        await renameFolder(item.item.id, name);
        setFolders(folders.map(f=>{
          if(f.id===item.item.id){
            f.name = name;
            return f;
          }
          return f;
        }))
        showToast("success", "Rename folder success");
      } catch (err) {
        showToast("error", "Error while renaming")
        console.log("Renaming error", err);
      } finally {
        onClose();
      }
    } else {
      try {
        await rename(item.item.id, name);
        setFiles(files.map(f=>{
          if(f.id===item.item.id){
            f.name = name;
            return f;
          }
          return f;
        }))
        showToast("success", "Rename folder success");
      } catch (err) {
        showToast("error", "Error while renaming")
        console.log("Renaming error", err);
      } finally {
        onClose();
      }
    }

  }

  return (
    <div className='bg-white p-4 rounded w-96'>
      <h2 className='text-lg font-semibold'>Rename</h2>

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border w-full mt-2 p-2' />

      <div className='flex justify-end gap-2 mt-4'>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleRename}>Save</button>
      </div>
    </div>
  )
}

export default RenameModal
