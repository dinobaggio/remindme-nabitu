import newAxios from "."

async function list() {
    return newAxios(true).get('/reminders')
}

async function create(data) {
    return newAxios(true).post('/reminders', data)
}

async function detail(id) {
    return newAxios(true).get(`/reminders/${id}`)
}

async function update(id, data) {
    return newAxios(true).put(`/reminders/${id}`, data)
}

async function destroy(id) {
    return newAxios(true).delete(`/reminders/${id}`)
}


export default {
    list,
    create,
    detail,
    update,
    destroy
}