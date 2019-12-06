import Axios from "axios";
import LocalStorageService from "./LocalStorageService";

const http = Axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    timeout: 5000,
    headers: {
        'X-Timezone': LocalStorageService.getTimezone()
    }
});

export default http