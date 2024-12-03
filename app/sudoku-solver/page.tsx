'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function SudokuSolver() {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)))

  const isValid = (board: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false
      if (board[x][col] === num) return false
      if (board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) return false
    }
    return true
  }

  const solveSudoku = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (solveSudoku(board)) {
                return true
              } else {
                board[row][col] = 0
              }
            }
          }
          return false
        }
      }
    }
    return true
  }

  const handleSolve = () => {
    const newGrid = [...grid]
    if (solveSudoku(newGrid)) {
      setGrid(newGrid)
    } else {
      alert('No solution exists!')
    }
  }

  const handleInputChange = (row: number, col: number, value: string) => {
    const newGrid = [...grid]
    newGrid[row][col] = value === '' ? 0 : parseInt(value)
    setGrid(newGrid)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sudoku Solver</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter Sudoku Puzzle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-9 gap-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Input
                  key={`${rowIndex}-${colIndex}`}
                  type="number"
                  min="1"
                  max="9"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  className="w-8 h-8 text-center p-0"
                />
              ))
            )}
          </div>
          <Button onClick={handleSolve} className="mt-4">Solve</Button>
        </CardContent>
      </Card>
    </div>
  )
}

