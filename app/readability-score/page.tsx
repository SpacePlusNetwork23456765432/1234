'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const calculateReadabilityScore = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const sentences = text.split(/[.!?]+/).filter(Boolean)
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0)

  const averageWordsPerSentence = words.length / sentences.length
  const averageSyllablesPerWord = syllables / words.length

  // Flesch-Kincaid Grade Level
  const gradeLevel = 0.39 * averageWordsPerSentence + 11.8 * averageSyllablesPerWord - 15.59

  return Math.round(gradeLevel * 10) / 10
}

const countSyllables = (word: string) => {
  word = word.toLowerCase()
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const syllableCount = word.match(/[aeiouy]{1,2}/g)?.length || 0
  return Math.max(1, syllableCount)
}

export default function ReadabilityScoreCalculator() {
  const [text, setText] = useState('')
  const [score, setScore] = useState<number | null>(null)

  const calculateScore = () => {
    const readabilityScore = calculateReadabilityScore(text)
    setScore(readabilityScore)
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Readability Score Calculator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                rows={10}
              />
            </div>
            <Button onClick={calculateScore}>Calculate Readability Score</Button>
            {score !== null && (
              <div className="mt-4">
                <p className="font-semibold">Flesch-Kincaid Grade Level:</p>
                <p>{score}</p>
                <p className="text-sm text-gray-500 mt-2">
                  This score suggests the U.S. grade level needed to understand the text.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

