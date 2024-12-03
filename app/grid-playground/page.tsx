'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CSSGridPlayground() {
  const [columns, setColumns] = useState('1fr 1fr 1fr')
  const [rows, setRows] = useState('100px 100px')
  const [gap, setGap] = useState('10px')
  const [numItems, setNumItems] = useState(6)

  const gridItems = Array.from({ length: numItems }, (_, i) => i + 1)

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">CSS Grid Playground</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Grid Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="columns">Grid Template Columns</Label>
              <Input
                id="columns"
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                placeholder="e.g., 1fr 1fr 1fr"
              />
            </div>
            <div>
              <Label htmlFor="rows">Grid Template Rows</Label>
              <Input
                id="rows"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
                placeholder="e.g., 100px 100px"
              />
            </div>
            <div>
              <Label htmlFor="gap">Grid Gap</Label>
              <Input
                id="gap"
                value={gap}
                onChange={(e) => setGap(e.target.value)}
                placeholder="e.g., 10px"
              />
            </div>
            <div>
              <Label htmlFor="numItems">Number of Items</Label>
              <Input
                id="numItems"
                type="number"
                value={numItems}
                onChange={(e) => setNumItems(parseInt(e.target.value))}
                min="1"
                max="20"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Grid Container</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-gray-300 p-4"
            style={{
              display: 'grid',
              gridTemplateColumns: columns,
              gridTemplateRows: rows,
              gap: gap,
            }}
          >
            {gridItems.map((item) => (
              <div
                key={item}
                className="bg-blue-500 text-white font-bold p-4 flex items-center justify-center"
              >
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

