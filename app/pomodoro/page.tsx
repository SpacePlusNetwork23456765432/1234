'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          clearInterval(interval!)
          setIsActive(false)
          if (!isBreak) {
            alert('Pomodoro completed! Take a break.')
            setIsBreak(true)
            setMinutes(5)
          } else {
            alert('Break time over! Start a new Pomodoro.')
            setIsBreak(false)
            setMinutes(25)
          }
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!)
    }

    return () => clearInterval(interval!)
  }, [isActive, minutes, seconds, isBreak])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
    setIsBreak(false)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isBreak ? 'Break Time' : 'Pomodoro Timer'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold text-center mb-4">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex justify-center space-x-2">
            <Button onClick={toggleTimer}>
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetTimer} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
