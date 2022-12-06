let itemsArray = getItemFromStorage ()
let itemsArrayProgress = getItemFromStorageProgress () 
let itemsArrayDone = getItemFromStorageDone () 

const url = 'https://jsonplaceholder.typicode.com/users'

const formElement = document.querySelector('#form')
const formEditElement = document.querySelector('#formEdit')
const inputTitleElement = document.querySelector('#taskTitle')
const inputDescriptionElement = document.querySelector('#taskDescription')
const todoContainerElement = document.querySelector('#items-todo')
const todoCounterElement = document.querySelector('#todoCounter')
const inProgressContainerElement = document.querySelector('#items-progress')
const inProgressCounterElement = document.querySelector('#progressCounter')
const doneContainerElement = document.querySelector('#items-done')
const doneCounterElement = document.querySelector('#doneCounter')
const deleteAllBtnElement = document.querySelector('#deleteAll')
const getUsersFormElement  = document.querySelector('#dropdownMenuForm')
const modalNoticeElement = document.querySelector('#myModal')
const btnCloseWarningElement = document.querySelector('.btn-close-warning')
const btnCloseModalElement = document.querySelector('.btn-close-item')
const userAllElement = document.querySelectorAll('.btn-select__users')

render ()

// Task's constructor
function ToDo (title, description, user) {
  this.title = title
  this.description = description
  this.id = Date.now()
  this.createdAt = new Date()
  this.user = user
  this.newClass = 'todo'
}

//----------------------------------------------------------------------------

// Template task
function creatTask (payload) {
  const date = payload.createdAt.toLocaleString()

  return `
          <div class="task ${payload.newClass}" id="${payload.id}">
            <div class="task-title">${payload.title}</div>
            <div class="task-description">${payload.description}</div>
            <div class="task-user">${payload.user}</div>
            <div class="task-time">${date}</div>

            <div class="dropdown btn-select">
              <button class="btn btn-secondary btn-custom" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-item" data-role="todo">Todo</li>
                <li class="dropdown-item" data-role="progress">In progress</li>
                <li class="dropdown-item" data-role="done">Done</li>
              </ul>
              <button type="button" class="btn btn-secondary btn-custom" data-role="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Edit</button>
              <button class="btn btn-secondary btn-custom" type="button" data-role="remove">Delete</button>
            </div>
          </div>
        `
}


// Template Users
function buildTemplateUsers (payload) {

  return `
        <option value="${payload.name}">${payload.name}</option>
          `
}


// Get users
fetch(url)
  .then((response) => {
    return response.json()
  })
  .then ((data) => {
    renderUser(data)
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })


// Render for users
function renderUser (data) {
  let html = `<option selected hidden>Selected user</option>`
  data.forEach(item => {
    const userItem = buildTemplateUsers(item)
    html = html + userItem
  })
  userAllElement.forEach(element => {
    element.innerHTML = html
  })
}


// Function for edit form
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

// Get time
let time = setInterval(() => {
  clock ()
}, 1000)

function clock () {
  let date = new Date()
  document.querySelector('.time').innerHTML = date.toLocaleTimeString()
}


// Array TODO
function getItemFromStorage () {
  const storage = localStorage.getItem('todos')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}


// Array PROGRESS
function getItemFromStorageProgress () {
  const storage = localStorage.getItem('in-progress')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}


// Array DONE
function getItemFromStorageDone() {
  const storage = localStorage.getItem('done')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}


// Render TODO
function renderTodo () {
  todoContainerElement.innerHTML = itemsArray.reduce((sum, item) => {
    const htmlItem = creatTask(item)
      return sum + htmlItem
    }, '')
    
  todoCounterElement.textContent = itemsArray.length
}


// Render PROGRESS
function renderProgress () {
  inProgressContainerElement.innerHTML = itemsArrayProgress.reduce((sum, item) => {
    const htmlItem = creatTask(item)
    return sum + htmlItem
  }, '')

  inProgressCounterElement.textContent = itemsArrayProgress.length
}


// Render DONE
function renderDone () {
  doneContainerElement.innerHTML = itemsArrayDone.reduce((sum, item) => {
    const htmlItem = creatTask(item)
    return sum + htmlItem
  }, '')

  doneCounterElement.textContent = itemsArrayDone.length
}


// Render common
function render () {
  renderTodo ()
  renderProgress ()
  renderDone ()
}


// Local Todo
function updateLocalStorageTodo () {
  localStorage.setItem('todos', JSON.stringify(itemsArray))
}


// Local Progress
function updateLocalStorageProgress () {
  localStorage.setItem('in-progress', JSON.stringify(itemsArrayProgress))
}


// Local Done
function updateLocalStorageDone () {
  localStorage.setItem('done', JSON.stringify(itemsArrayDone))
}


// Local common
function updateLocalStorage () {
  updateLocalStorageTodo ()
  updateLocalStorageProgress ()
  updateLocalStorageDone ()
}


// Delete task for ID
function removeById (id) {
  itemsArray.forEach((item, index) => {
    if (item.id == id) {
      itemsArray.splice(index, 1)
    }
  })
  itemsArrayProgress.forEach((item, index) => {
    if (item.id == id) {
      itemsArrayProgress.splice(index, 1)
    }
  })
  itemsArrayDone.forEach((item, index) => {
    if (item.id == id) {
      itemsArrayDone.splice(index, 1)
    }
  })
}

//--------------------------------------------------------------------------

// 
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


console.log(itemsArray);
console.log(itemsArrayProgress);
console.log(itemsArrayDone);

//------------------------------------------------------------

formElement.addEventListener('submit', heandleSubmitForm)
// formEditElement.addEventListener('submit', handleClickButtonEditSave)

todoContainerElement.addEventListener('click', handleClickButtonRemove)
todoContainerElement.addEventListener('click', handleClickInProgress)
todoContainerElement.addEventListener('click', handleClickDone)

// Редактирование формы
todoContainerElement.addEventListener('click', handleClickButtonEditSave)
inProgressContainerElement.addEventListener('click', handleClickButtonEditSave)
doneContainerElement.addEventListener('click', handleClickButtonEditSave)


inProgressContainerElement.addEventListener('click', handleClickButtonRemove)
inProgressContainerElement.addEventListener('click', handleClickTodo)
inProgressContainerElement.addEventListener('click', handleClickDone)


doneContainerElement.addEventListener('click', handleClickButtonRemove)
doneContainerElement.addEventListener('click', handleClickTodo)
doneContainerElement.addEventListener('click', handleClickInProgress)

deleteAllBtnElement.addEventListener('click', handleClickButtonRemoveAll)

btnCloseWarningElement.addEventListener('click', handleClickCloseModal)
btnCloseModalElement.addEventListener('click', handleClickCloseModal)
