'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DiceRoller() {
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [sides, setSides] = useState(6)
  const [results, setResults] = useState<number[]>([])

  const rollDice = () => {
    const newResults = []
    for (let i = 0; i < numberOfDice; i++) {
      newResults.push(Math.floor(Math.random() * sides) + 1)
    }
    setResults(newResults)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dice Roller</h1>
      <Card>
        <CardHeader>
          <CardTitle>Roll Your Dice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="numberOfDice">Number of Dice</Label>
              <Input
                id="numberOfDice"
                type="number"
                value={numberOfDice}
                onChange={(e) => setNumberOfDice(parseInt(e.target.value))}
                min="1"
                max="10"
              />
            </div>
            <div>
              <Label htmlFor="sides">Number of Sides</Label>
              <Input
                id="sides"
                type="number"
                value={sides}
                onChange={(e) => setSides(parseInt(e.target.value))}
                min="2"
              />
            </div>
            <Button onClick={rollDice}>Roll Dice</Button>
            {results.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Results:</h2>
                <div className="flex flex-wrap gap-2">
                  {results.map((result, index) => (
                    <div key={index} className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                      {result}
                    </div>
                  ))}
                </div>
                <p className="mt-2">Total: {results.reduce((a, b) => a + b, 0)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

