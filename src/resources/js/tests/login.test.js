import { mount } from "@vue/test-utils";
import { expect, test  } from 'vitest'
import Login from "../pages/login.vue";

test('test login page', async () => {
  const wrapper = mount(Login)
  await wrapper.vm.$nextTick();
  expect(wrapper.get('[type="submit"]').text()).toContain('Sign in')
  expect(wrapper.get('section').text()).toContain('Sign in to your account')
  expect(typeof wrapper.vm.login).toBe('function')
  expect(typeof wrapper.vm.submit).toBe('function')
})

test('test required form login', async () => {
  const wrapper = mount(Login)
  await wrapper.vm.$nextTick();
  wrapper.get('[name="email"]').setValue('')
  wrapper.get('[name="password"]').setValue('')
  wrapper.get('[type="submit"]').trigger('submit')
  await wrapper.vm.$nextTick();

  expect(wrapper.get('ul').text()).toContain('email required')
  expect(wrapper.get('ul').text()).toContain('password required')
})

test('test form login', async () => {
  const wrapper = mount(Login)
  await wrapper.vm.$nextTick()

  await wrapper.get('[name="email"]').setValue('alice@mail.com')
  await wrapper.get('[name="password"]').setValue('123456')
  await wrapper.get('[type="submit"]').trigger('submit')
  await wrapper.find('form').trigger('submit')
  
  expect(wrapper.element.querySelector('ul')).toBe(null)
})