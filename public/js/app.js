// console.log('Client side java script')



// grab the input form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
const address = search.value
messageOne.textContent = 'loading....'
messageTwo.textContent = ''
fetch('/weather?address=' + address)
.then((data) => {
    data.json().then((data) => {
        if (!data.error) {
            messageOne.textContent = data.weatherSummary  
            // messageTwo.textContent = data.weatherSummary  
        } else {
            messageTwo.textContent = data.error
            messageOne.textContent = ''
        }
    })

})
    // console.log(address)
})