'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function generateRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16)
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#000000')
  const [palette, setPalette] = useState<string[]>([])

  const generatePalette = () => {
    const newPalette = [baseColor]
    for (let i = 0; i < 4; i++) {
      newPalette.push(generateRandomColor())
    }
    setPalette(newPalette)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Color Palette Generator</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="baseColor">Base Color</Label>
          <Input
            id="baseColor"
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
          />
        </div>
        <Button onClick={generatePalette}>Generate Palette</Button>
        {palette.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Generated Palette</h2>
            <div className="flex space-x-2">
              {palette.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="mt-1 text-sm">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

