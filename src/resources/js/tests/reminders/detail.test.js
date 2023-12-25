import { mount } from "@vue/test-utils"
import { expect, test, vi } from 'vitest'
import DetailComponent from '../../components/reminderDetail.vue'
import Detail from '../../pages/reminders/detail.vue'
import { LOCALSTORAGE_KEY } from "../../libs/constants"

test('test detail reminder page', async () => {
    vi.mock('../../services/reminderService', () => ({
        detail: async () => Promise.resolve()
    }))
    vi.mock('vue-router', () => ({
        useRoute: () => ({
            params: { id: 1 }
        }),
        useRouter: () => ([])
    }))
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, 'asdf')
    localStorage.setItem(LOCALSTORAGE_KEY.REFRESH_TOKEN, 'ASDFF')
    const wrapper = mount(Detail)
    wrapper.vm.loading = false
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toContain('Detail Reminder')
})

test('test component detail reminder', async () => {
    const mockProps = {
        title: 'Test title',
        description: 'Description',
        remindAt: new Date(),
        eventAt: new Date()
    }
    const wrapper = mount(DetailComponent, {
        props: mockProps
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toContain('Detail Reminder')
    expect(wrapper.props().title).toContain(mockProps.title)
    expect(wrapper.props().description).toContain(mockProps.description)
    expect(wrapper.props().remindAt).toBe(mockProps.remindAt)
    expect(wrapper.props().eventAt).toBe(mockProps.eventAt)
})