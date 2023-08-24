
import { itemsArray,
        itemsArrayProgress,
        itemsArrayDone,
        todoContainerElement,
        todoCounterElement,
        inProgressContainerElement,
        inProgressCounterElement,
        doneContainerElement,
        doneCounterElement } from './variables.js'

import { creatTask } from './template.js'


// Clock
function getTime () {
  setInterval(() => {
    let date = new Date()
    document.querySelector('.time').innerHTML = date.toLocaleTimeString()
  }, 1000)
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
function getItemFromStorageDone () {
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
function updateLocalStorage () {
  localStorage.setItem('todos', JSON.stringify(itemsArray))
  localStorage.setItem('in-progress', JSON.stringify(itemsArrayProgress))
  localStorage.setItem('done', JSON.stringify(itemsArrayDone))
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

export { getTime,
        getItemFromStorage,
        getItemFromStorageProgress,
        getItemFromStorageDone,
        render,
        updateLocalStorage,
        removeById }
        