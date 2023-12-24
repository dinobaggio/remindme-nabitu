<script setup>
import Layout from '../../components/layouts/layout.vue'
import Loading from '../../components/loading.vue'
// import reminderService from '../services/reminderService';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import handleApiError from '../libs/handleApiError';

const router = useRouter()
const route = useRoute()
const loading = ref(true)

onMounted(async () => {
    console.log(route.params)
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
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
