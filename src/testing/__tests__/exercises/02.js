// simple test with ReactDOM
import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments when the button is clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')
  // 🐨 append the div to document.body (💰 document.body.appendChild)
  document.body.appendChild(div)
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  // 🐨 get a reference to the button (💰 div.querySelector)
  ReactDOM.render(<Counter />, div)
  const counter = div.querySelector('button')
  // 🐨 expect the button's textContent is '0'
  // 🐨 click the button (💰 button.click())
  // 🐨 expect the button's textContent is '1'
  expect(counter.textContent).toEqual('0')
  counter.click()
  expect(counter.textContent).toEqual('1')
  // 🐨 cleanup by removing the div from the page (💰 document.body.removeChild)
  document.body.removeChild(div)
})

// 💯 using .click on a DOM node works fine, but what if you wanted to fire an
// event that doesn't have a dedicated method (like mouseover). Rather than
// use `button.click()`, try using `button.dispatchEvent`:
// 📜 https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
// NOTE: Make sure that your event config sets `bubbles: true`

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=learn%20react%20testing&e=02&em=rcastner@kimmel.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////

/* eslint no-unused-vars:0 */
