import sendInfo from "./index.js";

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  sendInfoA()
})

const sendInfoA = () => {
  fetch('http://localhost:55000/send-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendInfo())
  })
}