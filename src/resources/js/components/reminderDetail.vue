<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
    remindAt: Date,
    eventAt: Date,
    title: String,
    description: String,
})
const remindAtVal = ref(null)
const eventAtVal = ref(null)

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${month}-${day} ${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}`;
}

onMounted(() => {
    remindAtVal.value = props.remindAt
    eventAtVal.value = props.eventAt
})
</script>

<template>
    <div class="flex items-center justify-center w-full rounded-lg">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Detail Reminder
                </h1>
                <div>
                    <div>
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input 
                            :value="title"
                            type="string"
                            name="title"
                            id="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type your title" disabled>
                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input 
                            :value="description"
                            type="string"
                            name="description"
                            id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type your description" disabled>
                    </div>
                    <div>
                        <label for="remind_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remind At</label>
                        <VueDatePicker 
                            v-model="remindAtVal"
                            :format="format"
                            placeholder="Remind at"
                            disabled
                        />
                    </div>
                    <div>
                        <label for="event_at" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event At</label>
                        <VueDatePicker 
                            v-model="eventAtVal"
                            :format="format"
                            placeholder="Event at"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
