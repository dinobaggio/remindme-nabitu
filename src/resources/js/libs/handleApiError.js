import { useToast } from "vue-toastification"
import authService from "../services/authService"
import { LOCALSTORAGE_KEY } from "./constants"

export default async function handleApiError(err, router, reCall = async () => {}) {
    const toast = useToast()
    if (err.response) {
        const { status, data } = err.response
        const toast = useToast()

        if (status === 401 ) {
            const refreshToken = localStorage.getItem(LOCALSTORAGE_KEY.REFRESH_TOKEN)
            try {
                const res = await authService.refreshToken(refreshToken)
                if (res?.data?.data) {
                    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, res?.data?.data?.access_token)
                    await reCall(true)
                }
                return
            } catch (errRes) {
                if (errRes?.response?.status === 401) {
                    const accessToken = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN)
                    if (accessToken) {
                        toast.error(errRes?.response?.data?.msg)
                    }

                    localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN)
                    localStorage.removeItem(LOCALSTORAGE_KEY.REFRESH_TOKEN)
                    router.push('/login')
                } else {
                    // toast.error('something went wrong')
                    
                }
                return
            }
        } else if (data?.msg) {
            toast.error(data.msg)
            return
        }
    }
    toast.error('something went wrong')
}