<script setup>
import { onMounted, ref } from 'vue';
import authService from '../services/authService';
import handleApiError from '../libs/handleApiError';
import { useRouter } from 'vue-router';
import Layout from '../components/layouts/layout.vue'
import Loading from '../components/loading.vue'

const profile = ref(null)
const loading = ref(true)
const router = useRouter()

async function getProfile() {
    try {
        const res = await authService.profile()
        profile.value = res.data
    } catch (err) {
        handleApiError(err, router, getProfile)
    }
}

onMounted(async () => {
    await getProfile()
    loading.value = false
})
</script>

<template>
    <Layout>
        <div class="max-w-screen-xl mx-auto px-4 mb-3">
            <div v-if="!!loading">
                <Loading />
            </div>
            <div class="mt-16" v-else>
                <div class="flex items-center justify-center w-full rounded-lg mb-3">
                    <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <a href="#" @click="router.go(-1)"><v-icon class="cursor-pointer" name="bi-arrow-left" scale="1.4" /></a>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full rounded-lg">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Profile
                            </h1>
                            <div>
                                <div>
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input 
                                        :value="profile?.name ?? ''"
                                        type="string"
                                        name="title"
                                        id="title"
                                        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Type your title"
                                        disabled
                                    >
                                </div>
                                <div>
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input 
                                        :value="profile?.email ?? ''"
                                        type="string"
                                        name="title"
                                        id="title"
                                        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Type your title"
                                        disabled
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>