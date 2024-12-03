'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const elements = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'Nonmetal' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'Noble Gas' },
  // Add more elements here...
]

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState(null)

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Periodic Table Explorer</h1>
      <div className="grid grid-cols-18 gap-1">
        {elements.map((element) => (
          <button
            key={element.symbol}
            className={`p-2 text-center border rounded hover:bg-gray-100 ${
              selectedElement === element ? 'bg-blue-200' : ''
            }`}
            onClick={() => setSelectedElement(element)}
          >
            {element.symbol}
          </button>
        ))}
      </div>
      {selectedElement && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedElement.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Symbol: {selectedElement.symbol}</p>
            <p>Atomic Number: {selectedElement.atomicNumber}</p>
            <p>Category: {selectedElement.category}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

