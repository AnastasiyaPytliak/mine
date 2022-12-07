import { ToDo } from './constructor.js'

import { itemsArray,
  itemsArrayProgress,
  itemsArrayDone,
  formElement,
  formEditElement,
  inputTitleElement,
  inputDescriptionElement, 
  getUsersFormElement,
  modalNoticeElement } from './variables.js'

import { render,
        updateLocalStorage,
        removeById } from './function.js'


// Add task
function heandleSubmitForm (event) {
  event.preventDefault()
  const titleValue = inputTitleElement.value
  const descriptionValue = inputDescriptionElement.value
  const userValue = getUsersFormElement.value
  let taskInfo = new ToDo (titleValue, descriptionValue, userValue)
  if (itemsArray.length < 3) {
    itemsArray.push(taskInfo)
  } else {
    modalNoticeElement.classList.toggle('show')
    modalNoticeElement.setAttribute('style', 'display:block')
  }
  formElement.reset()
  updateLocalStorage()
  render ()
}


// Edit form
function handleClickButtonEditSave (event) {
  const target = event.target
  
  if (target.dataset.role == 'edit') {

    if (target.closest('.todo')) {
      const closestElement = target.closest('.todo')
      const id = closestElement.id

      let item = itemsArray.find(element => element.id == id)

      formEditElement.querySelector('#taskTitleEdit').value = item.title
      formEditElement.querySelector('#taskDescriptionEdit').value = item.description
      formEditElement.querySelector('#dropdownMenuForm').value = item.user

      const titleTaskElement = formEditElement.querySelector('#taskTitleEdit')
      const descriptionTaskElement = formEditElement.querySelector('#taskDescriptionEdit')
      const user = formEditElement.querySelector('#dropdownMenuForm')
          
      formEditElement.addEventListener('submit', function () {
        item.title = titleTaskElement.value
        item.description = descriptionTaskElement.value
        item.user = user.value
        updateLocalStorage()
        render () 
      })

    } else if (target.closest('.in-progress')) {
      const closestElement = target.closest('.in-progress')
      const id = +closestElement.id

      let item = itemsArrayProgress.find(element => element.id == id)

      formEditElement.querySelector('#taskTitleEdit').value = item.title
      formEditElement.querySelector('#taskDescriptionEdit').value = item.description
      formEditElement.querySelector('#dropdownMenuForm').value = item.user

      const titleTaskElement = formEditElement.querySelector('#taskTitleEdit')
      const descriptionTaskElement = formEditElement.querySelector('#taskDescriptionEdit')
      const user = formEditElement.querySelector('#dropdownMenuForm')
          
      formEditElement.addEventListener('submit', function () {
        item.title = titleTaskElement.value
        item.description = descriptionTaskElement.value
        item.user = user.value
        updateLocalStorage()
        render () 
      })

    } else if (target.closest('.done')) {
      const closestElement = target.closest('.done')
      const id = +closestElement.id

      let item = itemsArrayDone.find(element => element.id == id)

      formEditElement.querySelector('#taskTitleEdit').value = item.title
      formEditElement.querySelector('#taskDescriptionEdit').value = item.description
      formEditElement.querySelector('#dropdownMenuForm').value = item.user

      const titleTaskElement = formEditElement.querySelector('#taskTitleEdit')
      const descriptionTaskElement = formEditElement.querySelector('#taskDescriptionEdit')
      const user = formEditElement.querySelector('#dropdownMenuForm')
          
      formEditElement.addEventListener('submit', function () {
        item.title = titleTaskElement.value
        item.description = descriptionTaskElement.value
        item.user = user.value
        updateLocalStorage()
        render () 
      })
    }
  }
}


// Close modal window "> 3"
function handleClickCloseModal () {
  modalNoticeElement.classList.remove('show')
  modalNoticeElement.setAttribute('style', 'display:none')
}


// Delete task - Событие
function handleClickButtonRemove(event) {
  const target = event.target

  if (target.dataset.role == 'remove') {
    const closestElement = target.closest('.task')
    const id = closestElement.id

    removeById(id)
    updateLocalStorage()
    render () 
  }
}


// Move to Todo
function handleClickTodo (event) {
  let target = event.target
  if (target.dataset.role == 'todo') {
    const closestElement = target.closest('.task')
    const id = +closestElement.id

    itemsArrayProgress.forEach((item, index) => {
      if (item.id == id) {
        if (itemsArray.length < 3) {
          item.newClass = 'todo'
          itemsArray.push(item)
          itemsArrayProgress.splice(index, 1)
        } else {
          modalNoticeElement.classList.add('show')
          modalNoticeElement.setAttribute('style', 'display:block')
        }
      }
    })

    itemsArrayDone.forEach((item, index) => {
      if (item.id == id) {
        if (itemsArray.length < 3) {
          item.newClass = 'todo'
          itemsArray.push(item)
          itemsArrayDone.splice(index, 1)
        } else {
          modalNoticeElement.classList.add('show')
          modalNoticeElement.setAttribute('style', 'display:block')
        }
      }
    })

    updateLocalStorage ()
    render () 
  }
}


// Move to Progress
function handleClickInProgress (event) {
  let target = event.target

  if (target.dataset.role == 'progress') {
    const closestElement = target.closest('.task')
    let id = +closestElement.id

    itemsArray.forEach((item, index) => {
      if (item.id == id) {
        if (itemsArrayProgress.length < 3) {
          item.newClass = 'in-progress'
          itemsArrayProgress.push(item)
          itemsArray.splice(index, 1)
        } else {
          modalNoticeElement.classList.add('show')
          modalNoticeElement.setAttribute('style', 'display:block')
        }
      }
    })

    itemsArrayDone.forEach((item, index) => {
      if (item.id == id) {
        if (itemsArrayProgress.length < 3) {
          item.newClass = 'in-progress'
          itemsArrayProgress.push(item)
          itemsArrayDone.splice(index, 1)
        } else {
          modalNoticeElement.classList.add('show')
          modalNoticeElement.setAttribute('style', 'display:block')
        }
      }
    })

    updateLocalStorage ()
    render () 
  }
}


// Move to Done
function handleClickDone (event) {
  let target = event.target

  if (target.dataset.role == 'done') {
    const closestElement = target.closest('.task')
    const id = +closestElement.id

    itemsArray.forEach((item, index) => {
      if (item.id == id) {
        if (itemsArrayDone.length < 3) {
          item.newClass = 'done'
          itemsArrayDone.push(item)
          itemsArray.splice(index, 1)
        } else {
          modalNoticeElement.classList.add('show')
          modalNoticeElement.setAttribute('style', 'display:block')
        }
      }
    })

    itemsArrayProgress.forEach((item, index) => {
      if (item.id == id) {
        if (itemsArrayDone.length < 3) {
          item.newClass = 'done'
          itemsArrayDone.push(item)
          itemsArrayProgress.splice(index, 1)
        } else {
          modalNoticeElement.classList.add('show')
          modalNoticeElement.setAttribute('style', 'display:block')
        }
      }
    })

    updateLocalStorage ()
    render () 
  }
}


// Remove all done task
function handleClickButtonRemoveAll () {
  itemsArrayDone.length = 0
  updateLocalStorage ()
  render () 
}

export { heandleSubmitForm,
        handleClickButtonEditSave,
        handleClickCloseModal,
        handleClickButtonRemove,
        handleClickTodo,
        handleClickInProgress,
        handleClickDone,
        handleClickButtonRemoveAll }
        