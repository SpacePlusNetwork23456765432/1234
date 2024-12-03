'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// This is a mock API call. In a real application, you would call an actual rhyme API.
const fetchRhymes = async (word: string) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock rhymes
  const rhymes = {
    'cat': ['hat', 'bat', 'rat', 'mat'],
    'dog': ['log', 'fog', 'bog', 'cog'],
    'house': ['mouse', 'grouse', 'douse', 'spouse'],
    // Add more mock rhymes as needed
  }
  
  return rhymes[word.toLowerCase()] || []
}

export default function RhymeFinder() {
  const [word, setWord] = useState('')
  const [rhymes, setRhymes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const findRhymes = async () => {
    setLoading(true)
    try {
      const result = await fetchRhymes(word)
      setRhymes(result)
    } catch (error) {
      console.error('Error fetching rhymes:', error)
      setRhymes([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Rhyme Finder</h1>
      <Card>
        <CardHeader>
          <CardTitle>Find Rhymes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="word">Enter a Word</Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="e.g., cat"
              />
            </div>
            <Button onClick={findRhymes} disabled={loading}>
              {loading ? 'Finding Rhymes...' : 'Find Rhymes'}
            </Button>
            {rhymes.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Rhymes:</h3>
                <ul className="list-disc pl-5">
                  {rhymes.map((rhyme, index) => (
                    <li key={index}>{rhyme}</li>
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

