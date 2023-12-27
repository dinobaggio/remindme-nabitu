import { LOCALSTORAGE_KEY } from '../libs/constants'

export default function newAxios(isAuth = false) {
    let { axios } = window
    if (!axios) {
        axios = import('axios')
    }
    const headers = {}
    if (isAuth === true) {
        const token = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN)
        headers["Authorization"] = `Bearer ${token}`
    }

    const instance = axios.create({
        baseURL: '/api',
        headers,
    });

    return instance
}