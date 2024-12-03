'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Sphinx of black quartz, judge my vow.",
  "Two driven jocks help fax my big quiz.",
]

export default function TypingSpeedTest() {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState<number | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)])
  }, [])

  const handleStart = () => {
    setUserInput('')
    setStartTime(Date.now())
    setEndTime(null)
    setWpm(null)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setUserInput(value)

    if (value === text) {
      setEndTime(Date.now())
    }
  }

  useEffect(() => {
    if (startTime && endTime) {
      const timeInMinutes = (endTime - startTime) / 60000
      const wordsTyped = text.split(' ').length
      setWpm(Math.round(wordsTyped / timeInMinutes))
    }
  }, [endTime, startTime, text])

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Typing Speed Test</h1>
      <Card>
        <CardHeader>
          <CardTitle>Type the following text:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg font-medium">{text}</p>
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows={3}
            disabled={!startTime || endTime !== null}
          />
          <div className="mt-4">
            <Button onClick={handleStart}>Start Test</Button>
          </div>
          {wpm !== null && (
            <p className="mt-4 text-xl font-bold">Your typing speed: {wpm} WPM</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

