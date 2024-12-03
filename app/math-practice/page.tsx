'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const operations = {
  addition: (a, b) => a + b,
  subtraction: (a, b) => a - b,
  multiplication: (a, b) => a * b,
  division: (a, b) => Math.round((a / b) * 100) / 100,
}

const difficulties = {
  easy: { min: 1, max: 10 },
  medium: { min: 1, max: 50 },
  hard: { min: 1, max: 100 },
}

export default function MathPractice() {
  const [difficulty, setDifficulty] = useState('easy')
  const [operation, setOperation] = useState('addition')
  const [problem, setProblem] = useState({ a: 0, b: 0 })
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const savedScore = localStorage.getItem('mathPracticeScore')
    const savedStreak = localStorage.getItem('mathPracticeStreak')
    if (savedScore) setScore(parseInt(savedScore))
    if (savedStreak) setStreak(parseInt(savedStreak))
    generateProblem()
  }, [difficulty, operation])

  useEffect(() => {
    localStorage.setItem('mathPracticeScore', score.toString())
    localStorage.setItem('mathPracticeStreak', streak.toString())
  }, [score, streak])

  const generateProblem = () => {
    const { min, max } = difficulties[difficulty]
    const a = Math.floor(Math.random() * (max - min + 1)) + min
    const b = Math.floor(Math.random() * (max - min + 1)) + min
    setProblem({ a, b })
    setUserAnswer('')
    setFeedback('')
  }

  const checkAnswer = () => {
    const correctAnswer = operations[operation](problem.a, problem.b)
    const isCorrect = parseFloat(userAnswer) === correctAnswer

    if (isCorrect) {
      setScore(score + 1)
      setStreak(streak + 1)
      setFeedback('Correct!')
    } else {
      setStreak(0)
      setFeedback(`Incorrect. The correct answer is ${correctAnswer}.`)
    }

    setTimeout(generateProblem, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Math Practice</h1>
      <div className="mb-4 flex space-x-2">
        <Select onValueChange={setDifficulty} defaultValue={difficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setOperation} defaultValue={operation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="addition">Addition</SelectItem>
            <SelectItem value="subtraction">Subtraction</SelectItem>
            <SelectItem value="multiplication">Multiplication</SelectItem>
            <SelectItem value="division">Division</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <p className="text-xl">
          {problem.a} {operation === 'addition' ? '+' : operation === 'subtraction' ? '-' : operation === 'multiplication' ? '×' : '÷'} {problem.b} = ?
        </p>
      </div>
      <div className="mb-4 flex space-x-2">
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <Button onClick={checkAnswer}>Submit</Button>
      </div>
      {feedback && <p className="mb-4 text-lg">{feedback}</p>}
      <div>
        <p>Score: {score}</p>
        <p>Streak: {streak}</p>
      </div>
    </div>
  )
}

