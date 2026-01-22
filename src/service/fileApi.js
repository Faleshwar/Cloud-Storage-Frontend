import http from "./http";

export const fileApi = {
    getFileDetails: (fileId)=> http.get(`/v1/files/${fileId}/items`),

    renameFile: (fileId, data)=> http.patch(`/v1/files/${fileId}`, data),

    moveFile: (fileId, targetFolderId)=> http.put(`/v1/files/${fileId}/move?targetFolderId=${targetFolderId}`),

    deleteFile: (fileId) => http.delete(`/v1/files/${fileId}`),

    restoreFile: (fileId)=> http.patch(`/v1/files/${fileId}/restore`),

    uploadFile: (folderId, formData)=> http.post(`/v1/files/${folderId}/upload`, formData),

    uploadFileInRoot: (formData, progresData) => http.post(`/v1/files/upload`, formData, progresData),

    myTrashed: ()=> http.get(`/v1/items/trashed`)
}