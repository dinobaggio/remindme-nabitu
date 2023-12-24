<script setup>
import Layout from '../../components/layouts/layout.vue'
import Loading from '../../components/loading.vue'
// import reminderService from '../services/reminderService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// import handleApiError from '../libs/handleApiError';

const router = useRouter()
const loading = ref(true)

onMounted(async () => {
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
                detail
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
