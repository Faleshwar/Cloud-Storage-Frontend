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

   

    return <ShareContext.Provider value={{shareFile, sharedWithMeFiles}}>{children}</ShareContext.Provider>
}

export const useShareContext = ()=>useContext(ShareContext);