// Task's constructor
function ToDo (title, description, user) {
  this.title = title
  this.description = description
  this.id = Date.now()
  this.createdAt = new Date()
  this.user = user
  this.newClass = 'todo'
}

export { ToDo }
