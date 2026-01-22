import React, { useEffect, useState } from 'react'
import folderIcon from '../assets/folder.png';
import Breadcrumbs from './Breadcrumbs';
import { useFolderContext } from '../context/FolderContext';
import { useUIContext } from '../context/UIContext';
import fileIcon from '../assets/file.png';
import Spinner from './Spinner';
import { useFileContext } from '../context/FileContext';



const MyDrive = () => {

    const { openFolder, loading, folders, files, setFolders, rootItems, markStar, deleteFolder, setFiles } = useFolderContext();
    const { deleteFile } = useFileContext();
    const {toggleSelect, openModal, showToast } = useUIContext();

    const [contextMenu, setContextMenu] = useState(null);


    const handleContextMenu = (e, type, item) => {
        e.preventDefault();
        if (type === "folder") {
            setContextMenu({ x: e.pageX, y: e.pageY, type: "folder", item: item })
        } else {
            setContextMenu({ x: e.pageX, y: e.pageY, type: "file", item: item })
        }

    }




    useEffect(() => {
        rootItems();
        const closeMenu = () => setContextMenu(null);
        window.addEventListener('click', closeMenu);
        //console.log(contextMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, [])

    const handleTrash = async (e, context) => {
        e.preventDefault();
        if (context.type === "file") {
            try {
                const res = await deleteFile(context.item.id);
                setFiles(files.filter(f => f.id !== context.item.id));
                showToast("success", res.data.message)
            } catch (err) {
                showToast("error", "Deleting folder error")
                console.error(err);
            }
        }else {
            try {
                const res = await deleteFolder(context.item.id);
                setFolders(folders.filter(f => f.id !== context.item.id));
                showToast("success", res.data.message)
            } catch (err) {
                showToast("error", "Deleting folder error")
                console.error(err);
            }

        }   
    }

    const handleMarkStar = async (e, fileID)=>{
        e.preventDefault();
        try{
            const res = await markStar(fileID);
            showToast("success", "Star marked success");
        }catch(err){
            showToast("error", "Star marking error");
            console.error(err);
        }
    }


    if (loading) return <Spinner />



    return (
        <div>
            <Breadcrumbs />
            <div className='h-screen overflow-auto'>
                {folders && folders.map((f) => (
                    <div key={f.id} className={`flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer`}
                        onClick={() => openFolder(f.id)} onContextMenu={(e) => handleContextMenu(e, "folder", f)}>
                        <img src={folderIcon} alt="folder" className='w-8 h-8' />
                        <div className='flex-1'>{f.name}</div>
                    </div>
                ))}
                <div>Files</div>
                {files && files.map((file) => (
                    <div key={file.id} className={`flex items-center gap-3 px-4 py-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer}`}
                        onClick={() => toggleSelect(file.id)} onContextMenu={(e) => handleContextMenu(e, "file", file)}>
                        <img src={fileIcon} alt="file" className='w-8 h-8' />
                        <div className='flex-1'>{file.name}</div>
                        <div className='flex-2'>
                            <i onClick={(e) => handleMarkStar(e,file.id)} className="fa-regular fa-star cursor-pointer"></i>
                        </div>
                        <div className='text-sm text-gray-500'>{file.mimeType.toString().includes("audio") ? `${(file.size / (1024 * 1024)).toFixed(2)}MB` : `${(file.size / 1024).toFixed(2)}KB`}</div>
                    </div>
                ))}
            </div>

            {/* Context Menu */}

            {contextMenu && (<ul className='absolute z-50 bg-white border border-gray-200 shadow-xl rounded-md py-2 w-48 text-sm'
                style={{ top: contextMenu.y, left: contextMenu.x }}>

                {contextMenu.type==="file" && <li className='px-4 py-4 hover:bg-blue-500 hover:text-white cursor-pointer' onClick={() => openModal("share", contextMenu)} >Share</li>}
                <li className='px-4 py-4 hover:bg-blue-500 hover:text-white cursor-pointer' onClick={() => openModal("rename", contextMenu)}>Rename</li>
                <li className='px-4 py-4 hover:bg-blue-500 hover:text-white cursor-pointer' onClick={() => openModal("move", contextMenu)}>Move</li>
                <hr className='my-1 border-gray-100' />
                <li className='px-4 py-4 hover:bg-blue-500 hover:text-white cursor-pointer' onClick={(e) => handleTrash(e, contextMenu)}>Move To Trash</li>
            </ul>)}

            {/* <Modal isOpen={selectedFile} onClose={()=>setOpen(false)} title="Rename File">
          <input type="text" value={newName} onChange={(e)=>setNewName(e.target.value)} className='w-full border p-2 rounded' />
          <button className="bg-green-400 py-2 px-4 mt-4 mb-4 rounded disabled:bg-gray-200" disabled= {(newName===null || newName.toString()==="")} onClick={handleRenameFile}>Save</button>
        </Modal>  */}

        </div>
    )
}

export default MyDrive
