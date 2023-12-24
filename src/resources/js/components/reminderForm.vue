<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    pageTitle: String,
    remindAt: Date,
    eventAt: Date,
    title: String,
    description: String,
    errors: Array,
    validate: Function,
    submit: Function
})

const emit = defineEmits([
    'update:title',
    'update:description',
    'update:remind-at',
    'update:event-at'
])

const remindAtVal = ref(null)
const eventAtVal = ref(null)

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

watch(remindAtVal, newVal => emit("update:remind-at", newVal))
watch(eventAtVal, newVal => emit("update:event-at", newVal))
</script>

<template>
    <div class="flex items-center justify-center w-full rounded-lg">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {{ pageTitle ?? '' }} Reminder
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
                    <div>
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input 
                            :value="title"
                            @input="$emit('update:title', $event.target.value)"
                            type="string"
                            name="title"
                            id="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type your title">
                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input 
                            :value="description"
                            @input="$emit('update:description', $event.target.value)"
                            type="string"
                            name="description"
                            id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type your description">
                    </div>
                    <div>
                        <label for="remind_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remind At</label>
                        <VueDatePicker 
                            v-model="remindAtVal"
                            :format="format"
                            placeholder="Remind at"
                        />
                    </div>
                    <div>
                        <label for="event_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event At</label>
                        <VueDatePicker 
                            v-model="eventAtVal"
                            :format="format"
                            placeholder="Event at"
                        />
                    </div>
                    <ul v-if="errors.length > 0" class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                        <li class="mt-2 text-xs text-red-600 dark:text-red-400" v-for="(item) of errors"><span class="font-medium">Error!</span> {{ item }}</li>
                    </ul>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
