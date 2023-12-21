import newAxios from "."

async function login({ email, password }) {
    return newAxios().post('/api/session', { email, password })
}

async function refreshToken(token) {
    const { axios } = window
    const instance = axios?.create({
        headers: { ['Authorization']: `Bearer ${token}` }
    })

    return instance.put('/api/session')
}

export default {
    login,
    refreshToken
}