import { mount } from "@vue/test-utils"
import { expect, test  } from 'vitest'
import Home from '../pages/home.vue'
import { LOCALSTORAGE_KEY } from "../libs/constants"

test('test home page', async () => {
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, 'asdf')
    localStorage.setItem(LOCALSTORAGE_KEY.REFRESH_TOKEN, 'ASDFF')
    const wrapper = mount(Home)
    await wrapper.vm.$nextTick()
    wrapper.vm.loading = false
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h2').text()).toContain('list reminders')
    expect(wrapper.find('div').text()).contain('Logout')
    expect(wrapper.find('div').text()).contain('Home')
})

test('test home contain reminders', async () => {
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, 'asdf')
    localStorage.setItem(LOCALSTORAGE_KEY.REFRESH_TOKEN, 'asdf')
    const wrapper = mount(Home)
    await wrapper.vm.$nextTick()
    wrapper.vm.loading = false
    const reminder = { id: 1, title: 'Reminder test', description: 'Description reminder' }
    wrapper.vm.reminders = [
        reminder
    ]
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h2').text()).toContain('list reminders')
    expect(wrapper.find('h5').text()).toContain(reminder.title)
    expect(wrapper.find('p').text()).toContain(reminder.description)
})