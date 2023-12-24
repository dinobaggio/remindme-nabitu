<script setup>
import moment from 'moment'
import { onMounted, ref, inject } from 'vue';
import Layout from '../../components/layouts/layout.vue'
import Loading from '../../components/loading.vue'
import ReminderForm from '../../components/reminderForm.vue';
import reminderService from '../../services/reminderService';
import { useRouter } from 'vue-router';
import handleApiError from '../../libs/handleApiError';

const router = useRouter()
const loading = ref(true)
const errors = ref([])
const remindAt = ref(new Date())
const eventAt = ref(null)
const title = ref(null)
const description = ref(null)
const swal = inject('$swal')

async function alertConfirm() {
    return swal.fire({
        title: "Apakah anda yakin ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    })
}

function validate({
    titleVal,
    descriptionVal,
    remindAtVal,
    eventAtVal,
}) {
    errors.value = []
    const errVal = errors.value

    if (!titleVal) {
        errVal.push('title is required')
    }
    if (!descriptionVal) {
        errVal.push('description is required')
    }
    if (!remindAtVal) {
        errVal.push('remind_at is required')
    }
    if (!eventAtVal) {
        errVal.push('event_at is required')
    }

    if (remindAtVal && eventAtVal && moment(remindAtVal).isAfter(eventAtVal)) {
        errVal.push('remind_at not greater than event_at')
    } else if (remindAtVal && moment(remindAtVal).isBefore(new Date())) {
        errVal.push('remind_at is not before today')
    } else if (eventAtVal && moment(eventAtVal).isBefore(new Date())) {
        errVal.push('event_at is not before today')
    }

    
    if (errVal.length > 0) {
        return false
    }

    return true
}

async function submit(fromCb = false) {
    const titleVal = title.value
    const descriptionVal = description.value
    const remindAtVal = remindAt.value
    const eventAtVal = eventAt.value
    const isValid = validate({
        titleVal,
        descriptionVal,
        remindAtVal,
        eventAtVal
    })

    if (isValid) {
        try {
            let aConfrim = false
            if (typeof fromCb === 'object') {
                aConfrim = await alertConfirm()
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
                    :validate="validate"
                    :submit="submit"
                    :errors="errors"
                    pageTitle="Create"
                />
            </div>
        </div>
    </Layout>
</template>

<style scoped></style>
