<script setup>
import Layout from '../components/layouts/layout.vue'
import Card from '../components/card.vue'
import Loading from '../components/loading.vue'
import reminderService from '../services/reminderService';
import { inject, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import handleApiError from '../libs/handleApiError';
import alertConfirm from '../libs/alertConfirm';

const router = useRouter()
const loading = ref(true)
const reminders = ref([])
const limit = ref(10)
const swal = inject('$swal')
const limits = ref([5, 10, 20, 50])

async function getReminders() {
    try {
        reminders.value = []
        const res = await reminderService.list({ limit: limit.value })
        reminders.value = res?.data?.data?.reminders
    } catch (err) {
        handleApiError(err, router, getReminders)
    }
}

async function deleteReminder(id, fromCb = false) {
    try {
        let aConfrim = false
        if (fromCb === false) {
            aConfrim = await alertConfirm(swal)
            aConfrim = aConfrim?.isConfirmed
        } else if (fromCb === true) {
            aConfrim = fromCb
        }
        if (aConfrim) {
            await reminderService.destroy(id)
            await swal.fire({
                icon: 'success',
                title: 'Success'
            })
            loading.value = true
            await getReminders()
            loading.value = false
        }
    } catch (err) {
        handleApiError(err, router, async (fromCb) => deleteReminder(id, fromCb))
    }
}

async function changeLmit(e) {
    limit.value = Number(e.target.value)
    loading.value = true
    await getReminders()
    loading.value = false
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
            <div class="mt-16 mb-8" v-else>
                <div class="flex flex-row items-center space-x-4">
                    <h2 class="w-full text-4xl font-extrabold dark:text-white mb-3">Reminders</h2>
                    <router-link :to="{ name: 'reminders.create' }"><v-icon class="cursor-pointer" name="md-addalert-outlined" scale="2" /></router-link>
                </div>
                <div class="max-w-sm mb-4">
                    <label for="limits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select limit</label>
                    <select @change="changeLmit" id="limits" name="limit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option :selected="item === limit" v-for="(item) of limits">{{ item }}</option>
                    </select>
                </div>
                <div v-for="(remind, i) of reminders">
                    <Card 
                        :number="i+1"
                        :title="remind.title"
                        :description="remind.description"
                        :remindAt="remind.remind_at"
                        :eventAt="remind.event_at"
                        :id="remind.id"
                        :deleteReminder="deleteReminder"
                    />
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
