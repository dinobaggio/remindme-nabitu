import newAxios from "."

async function login({ email, password }) {
    return newAxios().post('/session', { email, password })
}

async function refreshToken(token) {
    const { axios } = window
    const res = await axios.get('/sanctum/csrf-cookie')
    const instance = axios?.create({
        headers: { 
            ...res.config.headers,
            ['Authorization']: `Bearer ${token}`
        }
    })

    return instance.put('/api/session')
}

async function profile() {
    return newAxios(true).get('/profile')
}

export default {
    login,
    refreshToken,
    profile
}