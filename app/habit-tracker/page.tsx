'use client'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function HabitTracker() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [selectedDates, setSelectedDates] = useState({})

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits')
    const savedDates = localStorage.getItem('selectedDates')
    if (savedHabits) setHabits(JSON.parse(savedHabits))
    if (savedDates) setSelectedDates(JSON.parse(savedDates))
  }, [])

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
    localStorage.setItem('selectedDates', JSON.stringify(selectedDates))
  }, [habits, selectedDates])

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, newHabit.trim()])
      setNewHabit('')
    }
  }

  const toggleDate = (habit, date) => {
    setSelectedDates(prev => {
      const habitDates = prev[habit] || []
      const dateString = date.toISOString().split('T')[0]
      if (habitDates.includes(dateString)) {
        return { ...prev, [habit]: habitDates.filter(d => d !== dateString) }
      } else {
        return { ...prev, [habit]: [...habitDates, dateString] }
      }
    })
  }

  const getStreak = (habit) => {
    const dates = selectedDates[habit] || []
    let streak = 0
    let currentStreak = 0
    const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a))
    
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i])
      const previousDate = i > 0 ? new Date(sortedDates[i - 1]) : null
      
      if (!previousDate || (previousDate - currentDate) / (1000 * 60 * 60 * 24) === 1) {
        currentStreak++
      } else {
        if (currentStreak > streak) streak = currentStreak
        currentStreak = 1
      }
    }
    
    return Math.max(streak, currentStreak)
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Habit Tracker</h1>
      <div className="mb-4 flex">
        <Input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a new habit"
          className="mr-2"
        />
        <Button onClick={addHabit}>Add Habit</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map(habit => (
          <Card key={habit}>
            <CardHeader>
              <CardTitle>{habit}</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="multiple"
                selected={selectedDates[habit]?.map(date => new Date(date)) || []}
                onSelect={(date) => toggleDate(habit, date)}
              />
              <p className="mt-2">Current streak: {getStreak(habit)} days</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

