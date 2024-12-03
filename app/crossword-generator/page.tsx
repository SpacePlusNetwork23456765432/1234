'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Word {
  word: string;
  clue: string;
}

export default function CrosswordPuzzleGenerator() {
  const [words, setWords] = useState<Word[]>([])
  const [word, setWord] = useState('')
  const [clue, setClue] = useState('')
  const [puzzle, setPuzzle] = useState<string[][]>([])

  const addWord = () => {
    if (word && clue) {
      setWords([...words, { word: word.toUpperCase(), clue }])
      setWord('')
      setClue('')
    }
  }

  const generatePuzzle = () => {
    const size = 15
    const grid = Array(size).fill(null).map(() => Array(size).fill(' '))
    const usedWords: string[] = []

    words.sort((a, b) => b.word.length - a.word.length)

    for (const { word } of words) {
      if (usedWords.length === 0) {
        const row = Math.floor(size / 2)
        const col = Math.floor((size - word.length) / 2)
        for (let i = 0; i < word.length; i++) {
          grid[row][col + i] = word[i]
        }
        usedWords.push(word)
      } else {
        let placed = false
        for (let row = 0; row < size && !placed; row++) {
          for (let col = 0; col < size && !placed; col++) {
            if (grid[row][col] !== ' ') {
              const letter = grid[row][col]
              const index = word.indexOf(letter)
              if (index !== -1) {
                if (canPlaceVertically(grid, word, row, col, index)) {
                  placeVertically(grid, word, row, col, index)
                  placed = true
                  usedWords.push(word)
                } else if (canPlaceHorizontally(grid, word, row, col, index)) {
                  placeHorizontally(grid, word, row, col, index)
                  placed = true
                  usedWords.push(word)
                }
              }
            }
          }
        }
      }
    }

    setPuzzle(grid)
  }

  const canPlaceVertically = (grid: string[][], word: string, row: number, col: number, index: number) => {
    if (row - index < 0 || row - index + word.length > grid.length) return false
    for (let i = 0; i < word.length; i++) {
      if (i !== index && grid[row - index + i][col] !== ' ' && grid[row - index + i][col] !== word[i]) {
        return false
      }
    }
    return true
  }

  const canPlaceHorizontally = (grid: string[][], word: string, row: number, col: number, index: number) => {
    if (col - index < 0 || col - index + word.length > grid[0].length) return false
    for (let i = 0; i < word.length; i++) {
      if (i !== index && grid[row][col - index + i] !== ' ' && grid[row][col - index + i] !== word[i]) {
        return false
      }
    }
    return true
  }

  const placeVertically = (grid: string[][], word: string, row: number, col: number, index: number) => {
    for (let i = 0; i < word.length; i++) {
      grid[row - index + i][col] = word[i]
    }
  }

  const placeHorizontally = (grid: string[][], word: string, row: number, col: number, index: number) => {
    for (let i = 0; i < word.length; i++) {
      grid[row][col - index + i] = word[i]
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Crossword Puzzle Generator</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Words</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="word">Word</Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word"
              />
            </div>
            <div>
              <Label htmlFor="clue">Clue</Label>
              <Input
                id="clue"
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                placeholder="Enter a clue"
              />
            </div>
            <Button onClick={addWord}>Add Word</Button>
          </div>
        </CardContent>
      </Card>
      <Button onClick={generatePuzzle} className="mb-6">Generate Puzzle</Button>
      {puzzle.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Puzzle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-15 gap-1">
              {puzzle.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-8 h-8 border flex items-center justify-center font-bold"
                  >
                    {cell !== ' ' ? cell : ''}
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
              <h3 className="font-bold mb-2">Clues:</h3>
              <ul className="list-disc pl-5">
                {words.map((word, index) => (
                  <li key={index}>{word.clue}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

