import http from './HTTP'

function getEntriesWithDates(urlName, year, month, day) {

    let datePath = ""
    if (year && month && day) {
        datePath = `date/${year}/${month}/${day}/`
    }

    return http.get(`diaries/${urlName}/entries/${datePath}`)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.error(err)
        return null
    })
}

export default {
    getEntriesWithDates: getEntriesWithDates
}