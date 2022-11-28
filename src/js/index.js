let itemsArray = getItemFromStorage ()

const formElement = document.querySelector('#form')
const inputTitleElement = document.querySelector('#taskTitle')
const inputDescriptionElement = document.querySelector('#taskDescription')
const todoContainerElement = document.querySelector('#items-todo')
const todoCounterElement = document.querySelector('#todoCounter')
const inProgressContainerElement = document.querySelector('#items-progress')
const inProgressCounterElement = document.querySelector('#progressCounter')
const doneContainerElement = document.querySelector('#items-done')
const doneCounterElement = document.querySelector('#doneCounter')
const deleteAllBtnElement = document.querySelector('#deleteAll')
const submitFormBtnElement = document.querySelector('#submitForm')



render ()


// Get time
let time = setInterval(() => {
  clock ()
}, 1000)

function clock () {
  let date = new Date()
  document.querySelector('.time').innerHTML = date.toLocaleTimeString()
}

// Task's constructor
function ToDo (title, description) {
  this.title = title
  this.description = description
  this.id = Date.now()
  this.createdAt = new Date()
  this.newClass = 'todo'
}

function creatTask (payload) {
  const date = payload.createdAt.toLocaleString()

  return `
          <div class="task ${payload.newClass}" id="${payload.id}">
            <div class="task-title">${payload.title}</div>
            <div class="task-description">${payload.description}</div>
            <div class="task-user">User</div>
            <div class="task-time">${date}</div>

            <div class="dropdown btn-select">
              <button class="btn btn-secondary btn-custom" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select
              </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button" data-role="todo">Todo</button></li>
                <li><button class="dropdown-item" type="button" data-role="progress">In progress</button></li>
                <li><button class="dropdown-item" type="button" data-role="done">Done</button></li>
              </ul>
              <button type="button" class="btn btn-secondary btn-custom" data-role="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Edit</button>
              <button class="btn btn-secondary btn-custom" type="button" data-role="remove">Delete</button>
            </div>
          </div>
        `
}


function removeById (id) {
  itemsArray.forEach((item, index) => {
    if (item.id == id) {
      itemsArray.splice(index, 1)
    }
  })
}


function handleClickButtonEdit (event) {
  const target = event.target

  if (target.dataset.role == 'edit') {
    const closestElement = target.closest('.task')
    // const id = closestElement.id

    updateLocalStorage()
    render () 
  }
}


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


function getItemFromStorage () {
  const storage = localStorage.getItem('todos')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}


function updateLocalStorage () {
  localStorage.setItem('todos', JSON.stringify(itemsArray))
}

function heandleSubmitForm (event) {
  event.preventDefault()
  const titleValue = inputTitleElement.value
  const descriptionValue = inputDescriptionElement.value
  let taskInfo = new ToDo (titleValue, descriptionValue)
  itemsArray.push(taskInfo)
  
  formElement.reset()
  
  updateLocalStorage()
  render () 
}


function render () {

  let arrayTodo = []
  let arrayInProgress = []
  let arrayDone = []

  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].newClass == 'todo') {
      arrayTodo.push(itemsArray[i])
      todoContainerElement.innerHTML = arrayTodo.reduce((sum, item) => {
        const htmlItem = creatTask(item)
    
        return sum + htmlItem
      }, '')
    } else if (itemsArray[i].newClass == 'in-progress') {
      arrayInProgress.push(itemsArray[i])
      inProgressContainerElement.innerHTML = arrayInProgress.reduce((sum, item) => {
        const htmlItem = creatTask(item)
    
        return sum + htmlItem
      }, '')
    } else if (itemsArray[i].newClass == 'done') {
        arrayDone.push(itemsArray[i])
        doneContainerElement.innerHTML = arrayDone.reduce((sum, item) => {
          const htmlItem = creatTask(item)
      
          return sum + htmlItem
        }, '')
    }
  }

  if (arrayTodo.length == 0) {
    todoContainerElement.innerHTML = ''
  } else {
    
  }
  if (arrayInProgress.length == 0) {
    inProgressContainerElement.innerHTML = ''
  }
  if (arrayDone.length == 0) {
    doneContainerElement.innerHTML = ''
  }

  todoCounterElement.textContent = arrayTodo.length
  inProgressCounterElement.textContent = arrayInProgress.length
  doneCounterElement.textContent = arrayDone.length
}
  


function handleClickInProgress (event) {
  let target = event.target

  if (target.dataset.role == 'progress') {
    const closestElement = target.closest('.task')
    const id = +closestElement.id
    for (let i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].id == id) {
        itemsArray[i].newClass = 'in-progress'
      }
    }
    updateLocalStorage ()
    render () 
  }
}

function handleClickDone (event) {
  let target = event.target

  if (target.dataset.role == 'done') {
    const closestElement = target.closest('.task')
    const id = +closestElement.id
    for (let i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].id == id) {
        itemsArray[i].newClass = 'done'
      }
    }
    updateLocalStorage ()
    render () 
  }
}

function handleClickTodo (event) {
  let target = event.target

  if (target.dataset.role == 'todo') {
    const closestElement = target.closest('.task')
    const id = +closestElement.id
    for (let i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].id == id) {
        itemsArray[i].newClass = 'todo'
      }
    }
    updateLocalStorage ()
    render () 
  }
}


function handleClickButtonRemoveAll () {
  let arrayElement = [...doneContainerElement.children]
  
  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].newClass == 'done') {
      itemsArray.splice(i, arrayElement.length)
    }
  }
  arrayElement.length = 0
  updateLocalStorage ()
  render () 
}

console.log(itemsArray);

formElement.addEventListener('submit', heandleSubmitForm)

todoContainerElement.addEventListener('click', handleClickButtonRemove)
todoContainerElement.addEventListener('click', handleClickButtonEdit)
todoContainerElement.addEventListener('click', handleClickInProgress)
todoContainerElement.addEventListener('click', handleClickDone)


inProgressContainerElement.addEventListener('click', handleClickButtonRemove)
inProgressContainerElement.addEventListener('click', handleClickButtonEdit)
inProgressContainerElement.addEventListener('click', handleClickTodo)
inProgressContainerElement.addEventListener('click', handleClickDone)


doneContainerElement.addEventListener('click', handleClickButtonRemove)
doneContainerElement.addEventListener('click', handleClickButtonEdit)
doneContainerElement.addEventListener('click', handleClickTodo)
doneContainerElement.addEventListener('click', handleClickInProgress)

deleteAllBtnElement.addEventListener('click', handleClickButtonRemoveAll)


