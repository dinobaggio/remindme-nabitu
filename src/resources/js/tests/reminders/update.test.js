import { mount } from "@vue/test-utils"
import { expect, test, vi } from 'vitest'
import Update from '../../pages/reminders/update.vue'
import { LOCALSTORAGE_KEY } from "../../libs/constants"

test('test update reminder page', async () => {
    vi.mock('../../services/reminderService', () => ({
        detail: async () => Promise.resolve(),
        update: async () => Promise.resolve()
    }))
    vi.mock('vue-router', () => ({
        useRoute: () => ({
            params: { id: 1 }
        }),
        useRouter: () => ([])
    }))
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, 'asdf')
    localStorage.setItem(LOCALSTORAGE_KEY.REFRESH_TOKEN, 'ASDFF')
    const wrapper = mount(Update)
    wrapper.vm.loading = false
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toContain('Update Reminder')
})