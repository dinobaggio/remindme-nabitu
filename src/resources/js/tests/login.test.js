import { mount } from "@vue/test-utils";
import { expect, test } from 'vitest'
import Login from "../pages/login.vue";

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

test('test login page', () => {
  const wrapper = mount(Login)
  expect(wrapper.get('[type="submit"]').text()).toContain('Sign in')
  expect(wrapper.get('section').text()).toContain('Sign in to your account')
})

test('test required form login', async () => {
  const wrapper = mount(Login)
  wrapper.get('[name="email"]').setValue('')
  wrapper.get('[name="password"]').setValue('')
  wrapper.get('[type="submit"]').trigger('submit')

  await sleep(500)
  
  expect(wrapper.get('ul').text()).toContain('email required')
  expect(wrapper.get('ul').text()).toContain('password required')
})

test('test login success', async () => {
  const wrapper = mount(Login)
  wrapper.get('[name="email"]').setValue('alice@mail.com')
  wrapper.get('[name="password"]').setValue('123456')
  wrapper.get('[type="submit"]').trigger('submit')
  expect(wrapper.emitted().submit).toBeTruthy()
})