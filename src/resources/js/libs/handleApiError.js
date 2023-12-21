import { useToast } from "vue-toastification"

export default async function (err, router) {
    if (err.response) {
        const { status, data } = err.response
        const toast = useToast()
        toast.error(data.msg)

        if (status === 401 ) {
            // localStorage.removeItem('access_token')
            // router.push('/login')
        } else {
            
        }
    }
}