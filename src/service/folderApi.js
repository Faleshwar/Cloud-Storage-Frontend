import http from "./http";

export const folderApi = {
    getFolders: (folderId)=>http.get(`/v1/folders/${folderId}`),

    createFolder: (data)=> http.post(`/v1/folders`, data),

    renameFolder: (folderId,data)=> http.patch(`/v1/folders/${folderId}`, data),

    moveFolder: (folderId, parentFolderId)=> http.put(`/v1/folders/${folderId}?parentId=${parentFolderId}`),

    deleteFolder: (folderId)=> http.delete(`/v1/folders/${folderId}`),

    getRootFolders: ()=> http.get(`/v1/folders/root`),

    getFoldersAndFiles: (folderId)=> http.get(`/v1/folders/${folderId}/items`),

    restoreFolder: (folderId)=> http.put(`/v1/folders/${folderId}/restore`)
}