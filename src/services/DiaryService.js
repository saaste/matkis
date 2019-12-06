import http from './HTTP'

/**
 * Get all diaries
 * @returns {Promise<[] | Array>}
 */
function getDiaries() {
    return http.get("/diaries")
        .then(res => {
            return res.data.diaries
        })
        .catch(err => {
            console.error(err)
            return []
        })
}

/**
 * Get diary by URL name
 * @param {string} urlName
 * @returns {Promise<Object>}
 */
function getDiary(urlName) {
    return http.get(`/diaries/${urlName}`)
        .then(res => {
            return res.data
        }).catch(err => {
            if (!err.response || err.response.status !== 404) {
                console.error(err)
            }
            return null
        })
}

export default {
    getDiary: getDiary,
    getDiaries: getDiaries
}
