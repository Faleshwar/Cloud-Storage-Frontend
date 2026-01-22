import http from "./http";

export const starApi = {
    markStar: (fileId)=> http.post(`/v1/files/starred/${fileId}/mark`),

    unmarkStar: (fileId)=> http.patch(`/v1/files/starred/${fileId}/unmark`),

    starredFiles: ()=> http.get("/v1/files/starred")
}