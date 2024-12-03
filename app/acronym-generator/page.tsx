'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AcronymGenerator() {
  const [phrase, setPhrase] = useState('')
  const [acronym, setAcronym] = useState('')

  const generateAcronym = () => {
    const words = phrase.split(' ')
    const acronym = words
      .map(word => word.charAt(0).toUpperCase())
      .join('')
    setAcronym(acronym)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Acronym Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Acronym</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phrase">Enter Phrase</Label>
              <Input
                id="phrase"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="e.g., As Soon As Possible"
              />
            </div>
            <Button onClick={generateAcronym}>Generate Acronym</Button>
            {acronym && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <p>Acronym: {acronym}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

