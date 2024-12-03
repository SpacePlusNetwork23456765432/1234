'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function SVGPathEditor() {
  const [path, setPath] = useState('M10 10 H 90 V 90 H 10 L 10 10')
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [fillColor, setFillColor] = useState('none')

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">SVG Path Editor</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Path Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="path">SVG Path</Label>
              <Input
                id="path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="e.g., M10 10 H 90 V 90 H 10 L 10 10"
              />
            </div>
            <div>
              <Label htmlFor="strokeColor">Stroke Color</Label>
              <Input
                id="strokeColor"
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="strokeWidth">Stroke Width</Label>
              <Input
                id="strokeWidth"
                type="number"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                min="1"
                max="10"
              />
            </div>
            <div>
              <Label htmlFor="fillColor">Fill Color</Label>
              <Input
                id="fillColor"
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SVG Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <svg width="300" height="200" viewBox="0 0 100 100">
            <path
              d={path}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill={fillColor}
            />
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}

