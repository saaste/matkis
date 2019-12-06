import http from './HTTP'

function getAlbums(urlName) {
    return http.get(`/diaries/${urlName}/albums`)
    .then(res => {
        return res.data.albums
    }).catch(err => {
        if (!err.response || err.response.status !== 404) {
            console.error(err)
        }

        return null
    })
}

function getPhotos(urlName, placeId) {
    return http.get(`/diaries/${urlName}/albums/${placeId}/attachments`)
    .then(res => {
        return res.data.attachments
    }).catch(err => {
        if (!err.response || err.response.status !== 404) {
            console.error(err)
        }

        return null
    })
}

export default {
    getAlbums: getAlbums,
    getPhotos: getPhotos
}
