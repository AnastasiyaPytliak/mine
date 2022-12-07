import { getItemFromStorage,
        getItemFromStorageProgress,
        getItemFromStorageDone } from './function.js'

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

export { url,
        itemsArray,
        itemsArrayProgress,
        itemsArrayDone,
        formElement,
        formEditElement,
        inputTitleElement,
        inputDescriptionElement, 
        todoContainerElement,
        todoCounterElement,
        inProgressContainerElement,
        inProgressCounterElement,
        doneContainerElement,
        doneCounterElement,
        getUsersFormElement,
        deleteAllBtnElement,
        modalNoticeElement,
        btnCloseWarningElement,
        btnCloseModalElement,
        userAllElement }
        