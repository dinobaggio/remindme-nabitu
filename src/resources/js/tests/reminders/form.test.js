import { mount } from "@vue/test-utils"
import { expect, test  } from 'vitest'
import From from '../../components/reminderForm.vue'

test('test form reminders', () => {
    const wrapper = mount(From, {
        props: {
            title: '',
            description: '',
            remindAt: null,
            eventAt: null,
            errors: [],
            submit: () => {},
            validate: () => {}
        }
    })
    wrapper.vm.$nextTick()
    
    expect(typeof wrapper.props().submit).toBe('function')
    expect(typeof wrapper.props().validate).toBe('function')
    expect(Array.isArray(wrapper.props().errors)).toBe(true)
})

test('test form validation', () => {
    const errMsg = 'title required'
    const wrapper = mount(From, {
        props: {
            title: '',
            description: '',
            remindAt: null,
            eventAt: null,
            errors: [
                errMsg
            ],
            submit: () => {},
            validate: () => {}
        }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('ul').text()).toContain(errMsg)
})