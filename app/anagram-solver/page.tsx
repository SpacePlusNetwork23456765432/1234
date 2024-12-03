'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// This is a mock word list. In a real application, you would use a more comprehensive dictionary.
const wordList = ['listen', 'silent', 'enlist', 'tinsel', 'google', 'facebook', 'twitter', 'linkedin', 'instagram']

const findAnagrams = (word: string) => {
  const sortedWord = word.toLowerCase().split('').sort().join('')
  return wordList.filter(w => w.toLowerCase().split('').sort().join('') === sortedWord && w.toLowerCase() !== word.toLowerCase())
}

export default function AnagramSolver() {
  const [word, setWord] = useState('')
  const [anagrams, setAnagrams] = useState<string[]>([])

  const solveAnagram = () => {
    const result = findAnagrams(word)
    setAnagrams(result)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Anagram Solver</h1>
      <Card>
        <CardHeader>
          <CardTitle>Find Anagrams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="word">Enter a Word</Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="e.g., listen"
              />
            </div>
            <Button onClick={solveAnagram}>Find Anagrams</Button>
            {anagrams.length > 0 ? (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Anagrams:</h3>
                <ul className="list-disc pl-5">
                  {anagrams.map((anagram, index) => (
                    <li key={index}>{anagram}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4">No anagrams found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

