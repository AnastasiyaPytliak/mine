let itemsArray = getItemFromStorageTodo ()
let itemsProgressArray = getItemFromStorageProgress () 
let itemsDoneArray = getItemFromStorageDone ()

const formElement = document.querySelector('#form')
const inputTitleElement = document.querySelector('#taskTitle')
const inputDescriptionElement = document.querySelector('#taskDescription')
const todoContainerElement = document.querySelector('#items-todo')
const todoCounterElement = document.querySelector('#todoCounter')
const inProgressContainerElement = document.querySelector('#items-progress')
const inProgressCounterElement = document.querySelector('#progressCounter')
const doneContainerElement = document.querySelector('#items-done')
const doneCounterElement = document.querySelector('#doneCounter')



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
}

function creatTask (payload) {
  const date = payload.createdAt.toLocaleString()

  return `
          <div class="task" id="${payload.id}">
            <div class="task-title">${payload.title}</div>
            <div class="task-description">${payload.description}</div>
            <div class="task-user">User</div>
            <div class="task-time">${date}</div>

            <div class="dropdown btn-select">
              <button class="btn btn-secondary btn-custom" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select
              </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button" data-role="progress">In progress</button></li>
                <li><button class="dropdown-item" type="button">Done</button></li>
              </ul>
              <button type="button" class="btn btn-secondary btn-custom" data-role="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Edit</button>
              <button class="btn btn-secondary btn-custom" type="button" data-role="remove">Delete</button>
            </div>
          </div>
        `
}

// Удаляем карточку по id
function removeById (id) {
  itemsArray.forEach((item, index) => {
    // Находим todo по id
    if (item.id == id) {
      // Нашли, теперь находим todo по index  и удаляем
      itemsArray.splice(index, 1)
    }
  })
}


function handleClickButtonEdit (event) {
  const target = event.target

  if (target.dataset.role == 'edit') {
    const closestElement = target.closest('.task')
    // const id = closestElement.id

    updateLocalStorageTodo()
    updateLocalStorageProgress ()
    updateLocalStorageDone ()
    renderTodo ()
    renderInProgress ()
    renderDone ()
  }
}


function handleClickButtonRemove(event) {
  const target = event.target

  if (target.dataset.role == 'remove') {
    const closestElement = target.closest('.task')
    const id = closestElement.id

    removeById(id)
    updateLocalStorageTodo()
    updateLocalStorageProgress ()
    updateLocalStorageDone ()
    renderTodo ()
    renderInProgress ()
    renderDone ()

  }
}




//-----------------------------------------------
function getItemFromStorageTodo () {
  const storage = localStorage.getItem('todos')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}
//-----------------------------------------------
function getItemFromStorageProgress () {
  const storage = localStorage.getItem('progress')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}
//-------------------------------------
function getItemFromStorageDone () {
  const storage = localStorage.getItem('done')

  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    item.createdAt = new Date(item.createdAt)
  })

  return result
}
//-----------------------------------------------
function updateLocalStorageTodo () {
  localStorage.setItem('todos', JSON.stringify(itemsArray))
}

function updateLocalStorageProgress () {
  localStorage.setItem('progress', JSON.stringify(itemsProgressArray))
}

function updateLocalStorageDone () {
  localStorage.setItem('done', JSON.stringify(itemsProgressArray))
}

//-----------------------------------------------
//-----------------------------------------------
function renderTodo () {
  const html = itemsArray.reduce((sum, item) => {
    const htmlItem = creatTask(item)

    return sum + htmlItem
  }, '')

  todoContainerElement.innerHTML = html
  todoCounterElement.textContent = itemsArray.length
}
//__-----------------------------------


function renderInProgress () {
  const html = itemsProgressArray.reduce((sum, item) => {
    const htmlItem = creatTask(item)

    return sum + htmlItem
  }, '')

  inProgressContainerElement.innerHTML = html
  inProgressCounterElement.textContent = itemsProgressArray.length
}


function renderDone () {
  const html = itemsDoneArray.reduce((sum, item) => {
    const htmlItem = creatTask(item)

    return sum + htmlItem
  }, '')

  doneContainerElement.innerHTML = html
  doneCounterElement.textContent = itemsDoneArray.length
}
//-----------------------------------------------


function heandleSubmitForm (event) {
  event.preventDefault()
  const titleValue = inputTitleElement.value
  const descriptionValue = inputDescriptionElement.value
  let taskInfo = new ToDo (titleValue, descriptionValue)
  itemsArray.push(taskInfo)
  formElement.reset()
  updateLocalStorageTodo ()
  renderTodo ()
}

function headleClickInProgress (event) {
  let target = event.target

  if (target.dataset.role == 'progress') {
    const closestElement = target.closest('.task')
    const id = closestElement.id
    let itemNew = itemsArray.indexOf(id)
    console.log(itemNew);
    // itemsProgressArray.push(itemNew)
    // removeById (id)
    // updateLocalStorageTodo ()
    // updateLocalStorageProgress ()
    // updateLocalStorageDone () 
  //   // // console.log(itemNew);
  //   // // // removeById(id)
  //   // // // console.log(closestElement);
  //   // // renderInProgress (itemsArray[itemNew])

  //   // fragment = itemsArray.indexOf(id);
  //   // // fragment.appendChild(closestElement);
  //   // inProgressContainerElement.prepend(fragment);


  // renderTodo ()
  // renderInProgress ()
  // renderDone ()


  }
  
}


formElement.addEventListener('submit', heandleSubmitForm)
todoContainerElement.addEventListener('click', handleClickButtonRemove)
todoContainerElement.addEventListener('click', handleClickButtonEdit)
todoContainerElement.addEventListener('click', headleClickInProgress)


renderTodo ()
renderInProgress ()
renderDone ()