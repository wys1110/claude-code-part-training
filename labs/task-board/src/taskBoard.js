export class TaskBoard {
  constructor() {
    this.tasks = []
  }

  addTask(title) {
    if (!title) {
      throw new Error('Title is required')
    }

    const task = {
      id: this.tasks.length + 1,
      title,
      completed: false
    }

    this.tasks.push(task)
    return { ...task }
  }

  completeTask(id) {
    const task = this.tasks.find((item) => item.id === id)
    if (!task) {
      throw new Error(`Task ${id} not found`)
    }

    task.completed = true
    return { ...task }
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((item) => item.id === id)
    if (index === -1) {
      return false
    }

    this.tasks.splice(index, 1)
    return true
  }

  getTasks() {
    return this.tasks.map((task) => ({ ...task }))
  }
}
