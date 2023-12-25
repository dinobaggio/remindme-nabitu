<script setup>
import moment from 'moment'

defineProps({
    number: Number,
    title: String,
    description: String,
    remindAt: String,
    eventAt: String,
    id: Number,
    deleteReminder: Function
})
</script>

<template>
    <div class="mb-4 flex flex-row items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <v-icon name="fa-regular-bell" scale="2" />
        <div class="w-full">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">#{{ number }} {{ title }}</h5>
            <p class="font-normal text-gray-500 dark:text-gray-400">{{ description }}</p>
            <p class="font-normal text-gray-500 dark:text-gray-400">Remind at: {{ remindAt }}</p>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Event at: {{ eventAt }}</p>
            <router-link class="inline-flex items-center text-blue-600 hover:underline" :to="{ name: 'reminders.detail', params: { id } }">
                Detail
                <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
            </router-link>
        </div>
        <div>
            <router-link class="cursor-pointer" :to="{ name: 'reminders.update', params: { id } }"><v-icon name="bi-pencil" scale="1.4" /></router-link>
            <v-icon @click="() => deleteReminder(id)" class="cursor-pointer" name="bi-trash" scale="1.4" />
        </div>
    </div>
</template>

<style scoped></style>
