import { addNewTask } from './db_crud'

const { staticHost } = require('./settings')
const addTickerBtn = document.querySelector('.create-ticket')

addTickerBtn.addEventListener('click', (e) => {
    const modal = document.querySelector('.add-ticket-modal')
    modal.style.display = 'block'

    const cancelBtn = modal.querySelector('.add-ticket-cancelBtn')
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none'
    })
    const okBtn = modal.querySelector('.add-ticket-okBtn')
    okBtn.addEventListener('click', () => {
        const newTaskName = document.getElementById('textInput1').value
        const newTaskDescription = document.getElementById('textInput2').value
        addNewTask(newTaskName, newTaskDescription)
        modal.style.display = 'none'
    }) 
})