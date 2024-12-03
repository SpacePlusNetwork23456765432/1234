'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export default function FlashcardStudyTool() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const savedFlashcards = localStorage.getItem('flashcards')
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards))
  }, [flashcards])

  const addFlashcard = () => {
    if (question && answer) {
      const newFlashcard: Flashcard = {
        id: Date.now().toString(),
        question,
        answer,
      }
      setFlashcards([...flashcards, newFlashcard])
      setQuestion('')
      setAnswer('')
    }
  }

  const startStudying = () => {
    if (flashcards.length > 0) {
      const randomIndex = Math.floor(Math.random() * flashcards.length)
      setCurrentCard(flashcards[randomIndex])
      setShowAnswer(false)
    }
  }

  const nextCard = () => {
    startStudying()
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Flashcard Study Tool</h1>
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
          />
        </div>
        <div>
          <Label htmlFor="answer">Answer</Label>
          <Input
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter answer"
          />
        </div>
        <Button onClick={addFlashcard}>Add Flashcard</Button>
      </div>
      <Button onClick={startStudying} className="mb-4">Start Studying</Button>
      {currentCard && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{currentCard.question}</h2>
            {showAnswer && <p className="mb-4">{currentCard.answer}</p>}
            <div className="space-x-2">
              <Button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Button>
              <Button onClick={nextCard}>Next Card</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

