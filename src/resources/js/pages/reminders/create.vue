<script setup>
import moment from 'moment'
import { onMounted, ref, inject } from 'vue';
import Layout from '../../components/layouts/layout.vue'
import Loading from '../../components/loading.vue'
import ReminderForm from '../../components/reminderForm.vue';
import reminderService from '../../services/reminderService';
import { useRouter } from 'vue-router';
import handleApiError from '../../libs/handleApiError';
import validateReminders from '../../libs/validateReminders';
import alertConfirm from '../../libs/alertConfirm';

const router = useRouter()
const loading = ref(true)
const errors = ref([])
const remindAt = ref(null)
const eventAt = ref(null)
const title = ref(null)
const description = ref(null)
const swal = inject('$swal')

async function submit(fromCb = false) {
    const titleVal = title.value
    const descriptionVal = description.value
    const remindAtVal = remindAt.value
    const eventAtVal = eventAt.value

    const isValid = validateReminders({
        titleVal,
        descriptionVal,
        remindAtVal,
        eventAtVal
    }, errors)

    if (isValid) {
        try {
            let aConfrim = false
            if (typeof fromCb === 'object') {
                aConfrim = await alertConfirm(swal)
                aConfrim = aConfrim?.isConfirmed
            } else if (typeof fromCb === 'boolean') {
                aConfrim = fromCb
            }

            if (aConfrim) {
                await reminderService.create({
                    title: titleVal,
                    description: descriptionVal,
                    remind_at: moment(remindAtVal).format('YYYY-MM-DD HH:mm:00'),
                    event_at: moment(eventAtVal).format('YYYY-MM-DD HH:mm:00')
                })
                await swal.fire({
                    title: 'Success',
                    icon: 'success'
                })
                router.push('/')
            }
        } catch(err) {
            handleApiError(err, router, submit)
        }
    }
}

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
                <div class="flex items-center justify-center w-full rounded-lg mb-3">
                    <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
                        <a href="#" @click="router.go(-1)"><v-icon class="cursor-pointer" name="bi-arrow-left" scale="1.4" /></a>
                    </div>
                </div>
                <ReminderForm 
                    v-model:title="title"
                    v-model:description="description"
                    v-model:remind-at="remindAt"
                    v-model:event-at="eventAt"
                    :submit="submit"
                    :errors="errors"
                    pageTitle="Create"
                />
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
