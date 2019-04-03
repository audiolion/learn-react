// advanced form testing with react-testing-library: mocking modules
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
// 🐨 import the navigate function from the @reach/router module
// 💰 because you're going to use jest.mock below, the `navigate`, you pull
// in here will actually be whatever you return from your mock factory
// function below.
import Login from '../../components/login-submission'

// we don't actually have anywhere for @reach/router to navigate in our tests
// so it actually doesn't navigate anywhere which is fine, except we want to
// validate that our code is actually doing a navigation and that it's
// navigating to where we expect.

// 🐨 use jest.mock to mock @reach/router's `navigate` function
// 📜 https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options
// 💰 return {navigate: jest.fn()}

beforeAll(() => {
  jest.spyOn(window, 'fetch')
})

afterAll(() => {
  window.fetch.mockRestore()
})

beforeEach(() => {
  window.fetch.mockReset()
  // 🐨 reset the navigate mock (just like we're doing for window.fetch)
  // 🐨 we'll also want to remove `token` from localStorage so that's clean.
  // 💰 window.localStorage.removeItem('token')
})

// 🐨 we're going to be doing some async/await in here, so make this function async:
test('submitting the form makes a POST to /login and redirects the user to /app', () => {
  window.fetch.mockResolvedValueOnce({
    json: async () => ({token: 'fake-token'}),
  })
  const {getByLabelText, getByText} = render(<Login />)
  const username = 'chucknorris'
  const password = 'i need no password'

  fireEvent.change(getByLabelText(/username/i), {target: {value: username}})
  fireEvent.change(getByLabelText(/password/i), {target: {value: password}})
  fireEvent.click(getByText(/submit/i))

  expect(getByLabelText(/loading/i)).toBeInTheDocument()
  expect(window.fetch.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "/api/login",
    Object {
      "body": "{\\"username\\":\\"chucknorris\\",\\"password\\":\\"i need no password\\"}",
      "headers": Object {
        "content-type": "application/json;charset=UTF-8",
      },
      "method": "POST",
    },
  ],
]
`)
  // 🐨 use react-testing-library's `wait` utility (💰 import it at the top of the file)
  // here to wait until `navigate` has been called once.
  // 💰 make sure this test function supports `await` by making this test function `async`
  // 💰 await wait(() => expect........)
  //
  // 🐨 assert that navigate was called with the right arguments
  // 🐨 assert that localStorage's "token" item is "fake-token"
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=learn%20react%20testing&e=06&em=rcastner@kimmel.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
