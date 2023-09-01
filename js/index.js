import { renderUser } from './module/template-user.js'

import { getTime,
        render } from './module/function.js'

import{ heandleSubmitForm,
        handleClickButtonEdit,
        handleClickCloseModal,
        handleClickButtonRemove,
        handleClickTodo,
        handleClickInProgress,
        handleClickDone,
        handleClickButtonRemoveAll } from './module/handlers.js'

import { url,
        formElement,
        todoContainerElement,
        inProgressContainerElement,
        doneContainerElement,
        deleteAllBtnElement,
        btnCloseWarningElement,
        btnCloseModalElement } from './module/variables.js'

render ()
getTime ()


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


formElement.addEventListener('submit', heandleSubmitForm)

todoContainerElement.addEventListener('click', handleClickButtonRemove)
todoContainerElement.addEventListener('click', handleClickInProgress)
todoContainerElement.addEventListener('click', handleClickDone)
todoContainerElement.addEventListener('click', handleClickButtonEdit)

inProgressContainerElement.addEventListener('click', handleClickButtonRemove)
inProgressContainerElement.addEventListener('click', handleClickTodo)
inProgressContainerElement.addEventListener('click', handleClickDone)
inProgressContainerElement.addEventListener('click', handleClickButtonEdit)

doneContainerElement.addEventListener('click', handleClickButtonRemove)
doneContainerElement.addEventListener('click', handleClickTodo)
doneContainerElement.addEventListener('click', handleClickInProgress)
doneContainerElement.addEventListener('click', handleClickButtonEdit)

deleteAllBtnElement.addEventListener('click', handleClickButtonRemoveAll)

btnCloseWarningElement.addEventListener('click', handleClickCloseModal)
btnCloseModalElement.addEventListener('click', handleClickCloseModal)
