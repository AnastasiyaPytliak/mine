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
              <button class="btn btn-secondary btn-custom" type="button" data-role="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Edit</button>
              <button class="btn btn-secondary btn-custom" type="button" data-role="remove">Delete</button>
            </div>
          </div>
        `
}

export { creatTask }
