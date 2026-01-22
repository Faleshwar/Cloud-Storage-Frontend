import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fileApi } from "../service/fileApi";
import { folderApi } from "../service/folderApi";
import { starApi } from "../service/starApi";
import { shareApi } from "../service/shareApi";

export const FolderContext = createContext(null);

export const FolderProvider = ({children})=>{
    const [currentFolderId, setCurrentFolderId] = useState("root");
    const [loading, setLoading] = useState(true);
    const [folders, setFolders] = useState([])
    const [breadcrumbs, setBreadcrumbs] = useState([{id:"root", name:"My Drive"}]);
    const [files, setFiles] = useState([]);

    


    const rootItems = async ()=>{
        setLoading(true);
        setFolders([]);
        setFiles([]);
        
       try{
        const res = currentFolderId==="root"?await folderApi.getRootFolders():await folderApi.getFoldersAndFiles(currentFolderId);
        setFolders(res.data.data.folders);
        setFiles(res.data.data.files);

        if(res.data.data.breadcrumbs){   
            setBreadcrumbs([{id:"root", name:"My Drive"}, ...res.data.data.breadcrumbs]);
        }else{
            setBreadcrumbs([{id:"root", name:"My Drive"}]);
        }
       }catch(err){
        console.error(err);
       }finally{
        setLoading(false);
       }
    }

    const starredFiles = async ()=> {
        setLoading(true);
        setFiles([])
        try{
            const res = await starApi.starredFiles();
            setFiles(res.data.data);
        }catch(err){
            
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    const sharedWithMeFiles = async ()=>{
        setLoading(true);
        setFiles([])
        try{
            const res = await shareApi.sharedWithMeFiles();
            setFiles(res.data.data);
        }catch(err){
            
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    const markStar = async (fileId) =>{
        return await starApi.markStar(fileId);
    }

    const unmarkStar = async (fileId) =>{
        return await starApi.unmarkStar(fileId);
    }

    const openFolder = (folderId)=>setCurrentFolderId(folderId);

    const getChildren = ()=>{
        const folderChildren = Object.values(folders).filter(f=>f.parentId === currentFolderId)
        const fileChildren = Object.values(files).filter(f=>f.parentId === currentFolderId);
        return {folderChildren, fileChildren};
    }

    const restoreFolder = async (folderId)=>{
        return await folderApi.restoreFolder(folderId);
    }

   

    const getTrashedItems = async()=>{
        setLoading(true);
        setFolders([]);
        setFiles([]);
        try{
            const res = await fileApi.myTrashed();
            setFiles(res.data.files);
            setFolders(res.data.folders);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

   
    const renameFolder = async (folderId, newName)=>{
            const res = await folderApi.renameFolder(folderId, {name: newName});
            console.log(res.data);
            setFolders(folders.map(f=>{
                if(f.id ===folderId){
                    return {name: newName};
                }
                return f;
            }))
    }

    const moveFolder = async (folderId, targetFolderId)=>{
        try{
            const res = await folderApi.moveFolder(folderId, targetFolderId);
            console.log(res);
        }catch(err){
            console.error(err);
        }
    }

    const deleteFolder = async (folderId)=>{
        return await folderApi.deleteFolder(folderId);
    }

    const createFolder = async (name) =>{
        return await folderApi.createFolder({name: name});
    }

    useEffect(()=>{
         rootItems();
    }, [currentFolderId])

   const values = {loading,currentFolderId, createFolder, restoreFolder, deleteFolder, markStar, unmarkStar, starredFiles, moveFolder, renameFolder, openFolder, folders, setFolders, setFiles, files, getChildren, breadcrumbs, rootItems, sharedWithMeFiles, getTrashedItems};

    return <FolderContext.Provider value={values}>{children}</FolderContext.Provider>
}

export const useFolderContext = ()=>useContext(FolderContext);