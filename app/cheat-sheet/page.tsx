'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ReactMarkdown from 'react-markdown'

export default function CheatSheetGenerator() {
  const [sections, setSections] = useState([{ id: '1', content: '# New Section' }])

  useEffect(() => {
    const savedSections = localStorage.getItem('cheatSheetSections')
    if (savedSections) {
      setSections(JSON.parse(savedSections))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cheatSheetSections', JSON.stringify(sections))
  }, [sections])

  const onDragEnd = (result) => {
    if (!result.destination) return

    const newSections = Array.from(sections)
    const [reorderedItem] = newSections.splice(result.source.index, 1)
    newSections.splice(result.destination.index, 0, reorderedItem)

    setSections(newSections)
  }

  const addSection = () => {
    setSections([...sections, { id: Date.now().toString(), content: '# New Section' }])
  }

  const updateSection = (id, newContent) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, content: newContent } : section
    ))
  }

  const downloadHTML = () => {
    const html = `
      <html>
        <head>
          <title>Cheat Sheet</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            h1 { color: #2c3e50; }
            pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
          </style>
        </head>
        <body>
          ${sections.map(section => `<div>${ReactMarkdown({ children: section.content })}</div>`).join('')}
        </body>
      </html>
    `
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cheat-sheet.html'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cheat Sheet Generator</h1>
      <button 
        onClick={addSection}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Section
      </button>
      <button 
        onClick={downloadHTML}
        className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Download HTML
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 p-4 bg-white rounded shadow"
                    >
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        rows={5}
                      />
                      <div className="border p-4 rounded bg-gray-50">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

