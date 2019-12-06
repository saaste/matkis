import moment from 'moment-timezone'

class LocalStorageService {

    getTimezone() {
        let timezone = localStorage.getItem('TIMEZONE')
        if (timezone === null) {
            timezone = moment.tz.guess()
            this.setTimezone(timezone)
        }
        return timezone
    }

    setTimezone(timezone) {
        localStorage.setItem('TIMEZONE', timezone)
    }

}

export default new LocalStorageService()