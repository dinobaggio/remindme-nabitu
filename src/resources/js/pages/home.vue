<script setup>
import Layout from '../components/layouts/layout.vue'
import Card from '../components/card.vue'
import Loading from '../components/loading.vue'
import reminderService from '../services/reminderService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import handleApiError from '../libs/handleApiError';

const router = useRouter()
const loading = ref(true)
const reminders = ref([])

async function getReminders() {
    try {
        const res = await reminderService.list()
        reminders.value = res?.data?.data?.reminders
    } catch (err) {
        handleApiError(err, router, getReminders)
    }
}

onMounted(async () => {
    await getReminders()
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
                <div class="flex flex-row items-center space-x-4 mb-8">
                    <h2 class="w-full text-4xl font-extrabold dark:text-white mb-3">Reminders</h2>
                    <router-link :to="{ name: 'reminders.create' }"><v-icon class="cursor-pointer" name="md-addalert-outlined" scale="2" /></router-link>
                </div>
                <div v-for="(remind) of reminders">
                    <Card 
                        :title="remind.title"
                        :description="remind.description"
                        :id="remind.id"
                    />
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
