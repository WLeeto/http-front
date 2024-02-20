// const subscribeWidget = document.querySelector('.subscribe')
// const subscribeForm = subscribeWidget.querySelector('.subscribe-form')
// const nameInput = subscribeWidget.querySelector('.name')
// const phoneInput = subscribeWidget.querySelector('.phone')

// subscribeForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const body = Array.from(subscribeForm.elements)
//   .filter(({ name }) => name)
//   .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
//   .join('&')
//   const xhr = new XMLHttpRequest()
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState !== 4) return
//     console.log(xhr.responseText)
//   }
//   xhr.open('POST', 'http://localhost:7070/')
//   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
//   xhr.send(body)
// })

import checkedIco from '../img/checked.png'
import emptyIco from '../img/empty.png'
import editIco from '../img/edit.png'
import deleteIco from '../img/delete.png'

import { checkTask, deleteTask, editTicket } from './db_crud'

export const { staticHost } = require('./settings')

export const { xhr } = require('./settings')


function expandTask(e) {

  const taskItem = e.target.closest('.tasks-list-element');
  const description = taskItem.querySelector('.task-description');
  if(description.style.display == 'none') {
    description.style.display = 'block';
  } else {
    description.style.display = 'none'; 
  }
}

function getCheckIco(element) {
  let icon = emptyIco
  if(element.status) {
    icon = checkedIco
  }
  return icon
}

export function createNewTask(element) {
  const tasksList = document.querySelector('.tasks-list')
  const created = new Date(element.created)
  const formatedDate = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()} ${created.getHours()}:${String(created.getMinutes()).padStart(2, '0')}`
  
  const icon = getCheckIco(element)

  const li = document.createElement('li')
  li.classList.add("tasks-list-element")
  const liDiv = document.createElement('div')
  liDiv.classList.add('tasks-list-element-div')
  
  const imgCheck = document.createElement('img')
  imgCheck.src = icon
  imgCheck.classList.add('icon')
  imgCheck.classList.add('check')
  liDiv.appendChild(imgCheck)

  const liDivName = document.createElement('p')
  liDivName.classList.add('task-text')
  liDivName.textContent = `${element.name} ${formatedDate}`
  liDiv.appendChild(liDivName)

  const imgEdit = document.createElement('img')
  imgEdit.src = editIco
  imgEdit.classList.add('edit')
  imgEdit.classList.add('icon')
  const imgDelete = document.createElement('img')
  imgDelete.src = deleteIco
  imgDelete.classList.add('delete')
  imgDelete.classList.add('icon')

  liDiv.appendChild(imgEdit)
  liDiv.appendChild(imgDelete)

  li.appendChild(liDiv)
  tasksList.appendChild(li)

  const descriptionDiv = document.createElement('div')
  descriptionDiv.classList.add('task-description')
  const descriptionP = document.createElement('p')
  descriptionDiv.style.display = 'none'
  descriptionDiv.appendChild(descriptionP)
  li.appendChild(descriptionDiv)
  descriptionP.textContent = element.description
  descriptionP.classList.add('task-description-text')
  tasksList.appendChild(li)

  liDivName.addEventListener('click', expandTask)
  imgCheck.addEventListener('click', function() {
    checkTask(element, li)
  })
  imgDelete.addEventListener('click', function() {
    deleteTask(element, li)
  })
  imgEdit.addEventListener('click', function() {
    editTicket(element, li)
  })
}

export function refreshElement(elementLi, elementData) {
  const checkImg = elementLi.querySelector('.check')
  const icon = getCheckIco(elementData)
  checkImg.src = icon
  checkImg.addEventListener('click', function() {
    checkTask(elementData, elementLi)
  })
}

export function refreshElementText(elementLi, elementData) {
  const textP = elementLi.querySelector('.task-text')
  const created = new Date(elementData.created)
  const formatedDate = `${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()} ${created.getHours()}:${String(created.getMinutes()).padStart(2, '0')}`
  textP.textContent = `${elementData.name} ${formatedDate}`
  const description = elementLi.querySelector('.task-description-text')
  description.textContent = elementData.description
}

export function setFirstUl() {
  xhr.open('GET', staticHost + '?method=allTickets')
  xhr.send()
  xhr.onload = function() {
    if(xhr.status == 200) {
      const data = JSON.parse(xhr.responseText)
      data.forEach(element => {
        createNewTask(element)
      });
    }
  }
}
setFirstUl()