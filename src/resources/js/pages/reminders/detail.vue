<script setup>
import Layout from '../../components/layouts/layout.vue'
import Loading from '../../components/loading.vue'
import reminderService from '../../services/reminderService'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import handleApiError from '../../libs/handleApiError'
import moment from 'moment'
import ReminderDetail from '../../components/reminderDetail.vue'

const router = useRouter()
const route = useRoute()
const loading = ref(true)
const remindAt = ref(null)
const eventAt = ref(null)
const title = ref(null)
const description = ref(null)

async function getDetail(id) {
    try {
        const res = await reminderService.detail(id)
        const reminder = res.data.data
        title.value = reminder.title
        description.value = reminder.description
        remindAt.value = moment.unix(reminder.remind_at).toDate()
        eventAt.value = moment.unix(reminder.event_at).toDate()
    } catch (err) {
        console.error(err)
        await handleApiError(err, router, async () => getDetail(id))
    }
}

onMounted(async () => {
    await getDetail(route.params.id)
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
                <ReminderDetail
                    :title="title"
                    :description="description"
                    :remind-at="remindAt"
                    :event-at="eventAt"
                />
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
