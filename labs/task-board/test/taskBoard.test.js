import test from 'node:test'
import assert from 'node:assert/strict'
import { TaskBoard } from '../src/taskBoard.js'

test('adds a task with a unique id', () => {
  const board = new TaskBoard()
  const task = board.addTask('Write tests')

  assert.deepEqual(task, {
    id: 1,
    title: 'Write tests',
    completed: false
  })
})

test('rejects an empty title', () => {
  const board = new TaskBoard()
  assert.throws(() => board.addTask(''), /Title is required/)
})

test('rejects a whitespace-only title', () => {
  const board = new TaskBoard()
  assert.throws(() => board.addTask('   '), /Title is required/)
})

test('does not reuse ids after a task is deleted', () => {
  const board = new TaskBoard()
  board.addTask('First')
  board.addTask('Second')
  board.deleteTask(1)

  const third = board.addTask('Third')
  assert.equal(third.id, 3)
})

test('completes an existing task', () => {
  const board = new TaskBoard()
  const task = board.addTask('Ship feature')

  const completed = board.completeTask(task.id)
  assert.equal(completed.completed, true)
})

test('returns defensive copies of tasks', () => {
  const board = new TaskBoard()
  board.addTask('Protect internal state')

  const tasks = board.getTasks()
  tasks[0].title = 'Changed outside'

  assert.equal(board.getTasks()[0].title, 'Protect internal state')
})
