'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inprogress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    const savedColumns = localStorage.getItem('kanbanColumns')
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns))
  }, [columns])

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedColumns = [...columns]
      updatedColumns[0].tasks.push({
        id: Date.now().toString(),
        content: newTask.trim(),
      })
      setColumns(updatedColumns)
      setNewTask('')
    }
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result
    if (!destination) return

    const sourceColIndex = columns.findIndex(col => col.id === source.droppableId)
    const destColIndex = columns.findIndex(col => col.id === destination.droppableId)
    const sourceCol = columns[sourceColIndex]
    const destCol = columns[destColIndex]

    const sourceTasks = [...sourceCol.tasks]
    const destTasks = [...destCol.tasks]

    const [removed] = sourceTasks.splice(source.index, 1)
    destTasks.splice(destination.index, 0, removed)

    const newColumns = [...columns]
    newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks }
    newColumns[destColIndex] = { ...destCol, tasks: destTasks }

    setColumns(newColumns)
  }

  return (
    <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Kanban Board</h1>
      <div className="mb-4 flex space-x-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <Card key={column.id}>
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px]"
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-2 mb-2 rounded shadow"
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

