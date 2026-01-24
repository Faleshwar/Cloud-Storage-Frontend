import http from "./http";

export const shareApi = {
    sharedWithMeFiles: ()=> http.get("/v1/files/shared-with-me"),

    shareFileWithUser: (fileId, data)=> http.post(`/v1/files/share/${fileId}/user`, data),

    sharedFileRevoke: (fileId, userId)=> http.delete(`/v1/files/share/${fileId}/revoke?userId=${userId}`),

    shareLink: (fileId, data)=> http.post(`/v1/files/share/${fileId}/link`, data),

    shareRevoke: (fileId)=> http.delete(`/v1/files/share/${fileId}/revoke`)
}