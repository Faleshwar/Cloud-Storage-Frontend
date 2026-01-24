import React, { useEffect, useMemo, useState } from 'react'
import folderIcon from "../assets/folder.png";
import { folderApi } from '../service/folderApi';
import { useUIContext } from '../context/UIContext';
import { useFolderContext } from '../context/FolderContext';
import { useFileContext } from '../context/FileContext';

const FolderPicker = (data) => {

  const [folderss, setFolderss] = useState([]);
  const { showToast , closeModal} = useUIContext();
  const {moveFolder} = useFolderContext();
  const {move} = useFileContext();
  const {folders, setFolders, files, setFiles} = useFolderContext();

  const [selectedId, setSelectedId] = useState("root");

  console.log(data);

  const openFolder = async () => {
    if (!selectedId) return;
    try {
      const res = selectedId === "root" ? await folderApi.getRootFolders() : await folderApi.getFolders(selectedId);
      selectedId === "root" ? setFolderss(res.data.data.folders) : setFolderss(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleMove = async (e, parentFolderId) => {
    e.preventDefault();
    if (data.data.type === "folder") {
      try {
        const res = await moveFolder(data.data.item.id, parentFolderId);
        showToast("success", "Moving folder success");
        setFolders(folders.filter(f=>f.id!==data.data.item.id));
        console.log(res.data);
      } catch (err) {
        showToast("error", "Moving folder error")
      }finally{
        closeModal();
      }
    } else {
      try {
        const res = await move(data.data.item.id, parentFolderId);
        showToast("success", "Moving file success");
         setFiles(files.filter(f=>f.id!==data.data.item.id));
        console.log(res.data);
      } catch (err) {
        showToast("error", "Moving file error")
      }finally{
        closeModal();
      }

    }

  }



  useEffect(() => {
    openFolder();
  }, [selectedId])


  return (
    <div className='h-50 overflow-auto'>
      <div onClick={() => onSelect(null)}>Root</div>
      {folderss && folderss.map((f) => (
        <div key={f.id} className={`flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer`}
        >
          <img src={folderIcon} alt="folder" className='w-8 h-8' />
          <div className='flex-1'>{f.name}</div>
          <button onClick={(e) => { e.preventDefault(); setSelectedId(f.id) }} className=' text-black/30 text-sm hover:text-blue-400 mx-2 font-semibold'>Open</button>
          <button onClick={(e) => handleMove(e, f.id)} className=' hover:text-yellow-300 text-sm text-blue-400 mx-2 cursor-pointer'>Move</button>
        </div>
      ))}
    </div>
  )
}

export default FolderPicker
