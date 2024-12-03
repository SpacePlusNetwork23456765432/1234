'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William']
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Miller', 'Anderson', 'Wilson', 'Moore', 'Jackson', 'Martin']

export default function RandomNameGenerator() {
  const [generatedNames, setGeneratedNames] = useState<string[]>([])
  const [count, setCount] = useState(5)

  const generateNames = () => {
    const names = []
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      names.push(`${firstName} ${lastName}`)
    }
    setGeneratedNames(names)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Random Name Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Random Names</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="count">Number of names to generate</Label>
              <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                min="1"
                max="20"
              />
            </div>
            <Button onClick={generateNames}>Generate Names</Button>
            {generatedNames.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Generated Names:</h2>
                <ul className="list-disc pl-5">
                  {generatedNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

