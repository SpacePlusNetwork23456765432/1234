'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses')
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = () => {
    if (description && amount && date) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        description,
        amount: parseFloat(amount),
        date,
      }
      setExpenses([...expenses, newExpense])
      setDescription('')
      setAmount('')
      setDate('')
    }
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Expense Tracker</h1>
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter expense description"
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Button onClick={addExpense}>Add Expense</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses: ${totalExpenses.toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.map((expense) => (
            <div key={expense.id} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-bold">{expense.description}</p>
                <p className="text-sm text-gray-500">{expense.date}</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold mr-2">${expense.amount.toFixed(2)}</p>
                <Button variant="destructive" onClick={() => deleteExpense(expense.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

