'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function GridLayoutBuilder() {
  const [rows, setRows] = useState(3)
  const [columns, setColumns] = useState(3)
  const [gap, setGap] = useState(10)
  const [cells, setCells] = useState([])

  useEffect(() => {
    const savedLayout = localStorage.getItem('gridLayout')
    if (savedLayout) {
      const { rows, columns, gap, cells } = JSON.parse(savedLayout)
      setRows(rows)
      setColumns(columns)
      setGap(gap)
      setCells(cells)
    } else {
      initializeCells()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gridLayout', JSON.stringify({ rows, columns, gap, cells }))
  }, [rows, columns, gap, cells])

  const initializeCells = () => {
    const newCells = []
    for (let i = 0; i < rows * columns; i++) {
      newCells.push({ id: i, content: `Cell ${i + 1}` })
    }
    setCells(newCells)
  }

  const updateGrid = () => {
    initializeCells()
  }

  const updateCellContent = (id, content) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, content } : cell))
  }

  const generateCSS = () => {
    return `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
}
    `.trim()
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS())
      .then(() => alert('CSS copied to clipboard!'))
      .catch(err => console.error('Failed to copy CSS: ', err))
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Grid Layout Builder</h1>
      <div className="mb-4 flex space-x-2">
        <Input
          type="number"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          placeholder="Rows"
        />
        <Input
          type="number"
          value={columns}
          onChange={(e) => setColumns(parseInt(e.target.value))}
          placeholder="Columns"
        />
        <Input
          type="number"
          value={gap}
          onChange={(e) => setGap(parseInt(e.target.value))}
          placeholder="Gap (px)"
        />
        <Button onClick={updateGrid}>Update Grid</Button>
      </div>
      <div 
        className="mb-4 grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {cells.map(cell => (
          <div key={cell.id} className="bg-gray-200 p-4">
            <Input
              value={cell.content}
              onChange={(e) => updateCellContent(cell.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Generated CSS</h2>
        <pre className="bg-gray-100 p-4 rounded">{generateCSS()}</pre>
      </div>
      <Button onClick={copyCSS}>Copy CSS</Button>
    </div>
  )
}

