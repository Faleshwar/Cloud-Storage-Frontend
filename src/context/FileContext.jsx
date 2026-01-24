import { createContext, useContext, useState } from "react";
import { fileApi } from "../service/fileApi";
import { shareApi } from "../service/shareApi";

export const FileContext = createContext(null);

export const FileProvider = ({ children }) => {

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const upload = async (formData) => {
        setLoading(true);

        try {
            let onUploadProgress= (progressEvent) => {
                    const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentageCompleted);}

            const res = await fileApi.uploadFileInRoot(formData, {onUploadProgress});
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    const rename = async (fileId, data) => {
        return await fileApi.renameFile(fileId, {name: data});
    }


    const move = async (fileId, targetFolderId) => {
        return await fileApi.moveFile(fileId, targetFolderId);
    }

    const deleteFile = async (fileId) => {
        return await fileApi.deleteFile(fileId);
    }

    const restoreFile = async (fileId) => {
        return await fileApi.restoreFile(fileId);
    }



    const values = {
        upload,
        rename,
        move,
        deleteFile,
        restoreFile,
        progress,
        loading
    }

    return <FileContext.Provider value={values}>{children}</FileContext.Provider>
}

export const useFileContext = () => useContext(FileContext);