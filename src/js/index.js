import { renderUser } from './module/template-user.js'

import { clock,
        render } from './module/function.js'

import{ heandleSubmitForm,
        handleClickButtonEditSave,
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
clock ()


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
todoContainerElement.addEventListener('click', handleClickButtonEditSave)

inProgressContainerElement.addEventListener('click', handleClickButtonRemove)
inProgressContainerElement.addEventListener('click', handleClickTodo)
inProgressContainerElement.addEventListener('click', handleClickDone)
inProgressContainerElement.addEventListener('click', handleClickButtonEditSave)


doneContainerElement.addEventListener('click', handleClickButtonRemove)
doneContainerElement.addEventListener('click', handleClickTodo)
doneContainerElement.addEventListener('click', handleClickInProgress)
doneContainerElement.addEventListener('click', handleClickButtonEditSave)

deleteAllBtnElement.addEventListener('click', handleClickButtonRemoveAll)

btnCloseWarningElement.addEventListener('click', handleClickCloseModal)
btnCloseModalElement.addEventListener('click', handleClickCloseModal)
