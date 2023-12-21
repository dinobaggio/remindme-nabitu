export default function newAxios(isAuth = false) {
    const { axios } = window
    const headers = {}
    if (isAuth === true) {
        const token = localStorage.getItem("access_token")
        headers["Authorization"] = `Bearer ${token}`
    }

    const instance = axios.create({
        headers,
    });

    return instance
}