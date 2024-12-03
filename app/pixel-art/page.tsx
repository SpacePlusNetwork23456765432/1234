'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PixelArtCreator() {
  const [gridSize, setGridSize] = useState(16)
  const [color, setColor] = useState('#000000')
  const [grid, setGrid] = useState(Array(gridSize).fill(Array(gridSize).fill('white')))

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value)
    setGridSize(newSize)
    setGrid(Array(newSize).fill(Array(newSize).fill('white')))
  }

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = grid.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === colIndex ? color : cell)) : row
    )
    setGrid(newGrid)
  }

  const handleClear = () => {
    setGrid(Array(gridSize).fill(Array(gridSize).fill('white')))
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pixel Art Creator</h1>
      <div className="space-y-4 mb-4">
        <div>
          <Label htmlFor="gridSize">Grid Size</Label>
          <Input
            id="gridSize"
            type="number"
            value={gridSize}
            onChange={handleSizeChange}
            min="1"
            max="32"
          />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <Button onClick={handleClear}>Clear</Button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '1px',
          border: '1px solid #ccc',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cellColor, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                backgroundColor: cellColor,
                aspectRatio: '1',
                cursor: 'pointer',
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  )
}

