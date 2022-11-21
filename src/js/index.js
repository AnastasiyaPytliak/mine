let itemsArray = getItemFromStorage ()

const formElement = document.querySelector('#form')
const inputTitleElement = document.querySelector('#taskTitle')
const inputDescriptionElement = document.querySelector('#taskDescription')
const todoContainerElement = document.querySelector('#items-todo')

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
          <div class="task">
            <div class="task-title">${payload.title}</div>
            <div class="task-description">${payload.description}<</div>
            <div class="task-user">User</div>
            <div class="task-time">${date}</div>

            <div class="dropdown btn-select">
              <button class="btn btn-secondary btn-custom" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select
              </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button">In progress</button></li>
                <li><button class="dropdown-item" type="button">Done</button></li>
              </ul>
            </div>
              <div class="dropdown btn-edit">
                <button class="btn btn-secondary btn-custom" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg class="img-edit" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3.75 5.5a.75.75 0 000 1.5h10a.75.75 0 000-1.5h-10zm5 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zM5 12a1 1 0 11-2 0 1 1 0 012 0zm-1 7a1 1 0 100-2 1 1 0 000 2z"/>
                    <path d="M19.309 7.918l-2.245-2.501A.25.25 0 0117.25 5h4.49a.25.25 0 01.185.417l-2.244 2.5a.25.25 0 01-.372 0z"/>
                  </svg>
                </button>
                <ul class="dropdown-menu">
                  <li><button class="dropdown-item" type="button">Edit</button></li>
                  <li><button class="dropdown-item" type="button">Delete</button></li>
                </ul>
              </div>
          </div>
        `
}

function render () {
  const html = itemsArray.reduce((sum, item) => {
    const htmlItem = creatTask(item)

    return sum + htmlItem
  }, '')

  todoContainerElement.innerHTML = html
}

function getItemFromStorage () {
  const storage = localStorage.getItem('todos')

  // Проверяем наличие todo в хранилище
  if (!storage) return []

  const result = JSON.parse(storage)
  result.forEach(item => {
    // Трансформируем дату из строки обратно в объект
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
  render()
}

formElement.addEventListener('submit', heandleSubmitForm)

render ()