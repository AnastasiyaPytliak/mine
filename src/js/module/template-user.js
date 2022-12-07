import { userAllElement } from './variables.js'


// Template Users
function buildTemplateUsers (payload) {

  return `
        <option value="${payload.name}">${payload.name}</option>
          `
}


// Render for users
function renderUser (data) {
  let html = `<option selected hidden> Selected user </option>`
  data.forEach(item => {
    const userItem = buildTemplateUsers(item)
    html = html + userItem
  })
  userAllElement.forEach(element => {
    element.innerHTML = html
  })
}

export { buildTemplateUsers, renderUser }
