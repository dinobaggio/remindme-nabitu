import { useToast } from "vue-toastification"
import authService from "../services/authService"

export default async function handleApiError(err, router, reCall = async () => {}) {
    const toast = useToast()
    if (err.response) {
        const { status, data } = err.response
        const toast = useToast()

        if (status === 401 ) {
            const refreshToken = localStorage.getItem('refresh_token')
            try {
                const res = await authService.refreshToken(refreshToken)
                if (res?.data?.data) {
                    localStorage.setItem('access_token', res?.data?.data?.access_token)
                    await reCall()
                }
            } catch (errRes) {
                if (errRes?.response?.status === 401) {
                    const accessToken = localStorage.getItem('access_token')
                    if (accessToken) {
                        toast.error(errRes?.response?.data?.msg)
                    }

                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    router.push('/login')
                } else {
                    toast.error('something went wrong')
                }
            }
        } else if (data?.msg) {
            toast.error(data.msg)
        }
        return
    }
    toast.error('something went wrong')
}