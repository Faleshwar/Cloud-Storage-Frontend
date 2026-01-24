import { createContext, useContext } from "react";
import { shareApi } from "../service/shareApi";

export const ShareContext = createContext(null);


export const ShareProvider = ({children})=>{
    const shareFile = async (fileId, data) => {
        return await shareApi.shareFileWithUser(fileId, data);
    }
    const sharedWithMeFiles = async ()=>{
        return await shareApi.sharedWithMeFiles();
    }

   const revokeShare = async(fileId)=>{
    return await shareApi.revokeShare(fileId);
   }

    return <ShareContext.Provider value={{shareFile, sharedWithMeFiles, revokeShare}}>{children}</ShareContext.Provider>
}

export const useShareContext = ()=>useContext(ShareContext);