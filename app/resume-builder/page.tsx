'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function ResumeBuilder() {
  const [entries, setEntries] = useState([])
  const [newEntry, setNewEntry] = useState({ title: '', date: '', description: '' })

  useEffect(() => {
    const savedEntries = localStorage.getItem('resumeEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('resumeEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = () => {
    if (newEntry.title && newEntry.date) {
      setEntries([...entries, { ...newEntry, id: Date.now().toString() }])
      setNewEntry({ title: '', date: '', description: '' })
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(entries)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setEntries(items)
  }

  const generateHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Timeline</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .timeline { position: relative; max-width: 1200px; margin: 0 auto; }
        .timeline::after { content: ''; position: absolute; width: 6px; background-color: #2c3e50; top: 0; bottom: 0; left: 50%; margin-left: -3px; }
        .container { padding: 10px 40px; position: relative; background-color: inherit; width: 50%; }
        .container::after { content: ''; position: absolute; width: 25px; height: 25px; right: -17px; background-color: white; border: 4px solid #2c3e50; top: 15px; border-radius: 50%; z-index: 1; }
        .left { left: 0; }
        .right { left: 50%; }
        .left::before { content: " "; height: 0; position: absolute; top: 22px; width: 0; z-index: 1; right: 30px; border: medium solid #2c3e50; border-width: 10px 0 10px 10px; border-color: transparent transparent transparent #2c3e50; }
        .right::before { content: " "; height: 0; position: absolute; top: 22px; width: 0; z-index: 1; left: 30px; border: medium solid #2c3e50; border-width: 10px 10px 10px 0; border-color: transparent #2c3e50 transparent transparent; }
        .right::after { left: -16px; }
        .content { padding: 20px 30px; background-color: white; position: relative; border-radius: 6px; border: 2px solid #2c3e50; }
    </style>
</head>
<body>
    <h1>Resume Timeline</h1>
    <div class="timeline">
        ${entries.map((entry, index) => `
        <div class="container ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="content">
                <h2>${entry.title}</h2>
                <p>${entry.date}</p>
                <p>${entry.description}</p>
            </div>
        </div>
        `).join('')}
    </div>
</body>
</html>
    `

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume-timeline.html'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Timeline Builder</h1>
      <div className="mb-4 grid gap-2">
        <Input
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          placeholder="Title"
        />
        <Input
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Date"
        />
        <Textarea
          value={newEntry.description}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
          placeholder="Description"
        />
        <Button onClick={addEntry}>Add Entry</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="entries">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {entries.map((entry, index) => (
                <Draggable key={entry.id} draggableId={entry.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2 p-2 bg-white rounded shadow"
                    >
                      <h3>{entry.title}</h3>
                      <p>{entry.date}</p>
                      <p>{entry.description}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={generateHTML} className="mt-4">Generate Resume</Button>
    </div>
  )
}

