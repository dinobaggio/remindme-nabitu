import { mount } from "@vue/test-utils"
import { expect, test  } from 'vitest'
import sleep from '../../libs/sleep'
import Create from '../../pages/reminders/create.vue'
import { LOCALSTORAGE_KEY } from "../../libs/constants"

test('test create reminder page', async () => {
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, 'asdf')
    localStorage.setItem(LOCALSTORAGE_KEY.REFRESH_TOKEN, 'ASDFF')
    const wrapper = mount(Create)
    wrapper.vm.loading = false
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toContain('Create Reminder')
})