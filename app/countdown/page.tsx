'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function CountdownTimer() {
  const [time, setTime] = useState(300) // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      alert('Countdown finished!')
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(300)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Countdown Timer</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl">{formatTime(time)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="time">Set Time (seconds)</Label>
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(parseInt(e.target.value))}
                min="1"
                disabled={isActive}
              />
            </div>
            <div className="flex justify-center space-x-2">
              <Button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</Button>
              <Button onClick={resetTimer} variant="outline">Reset</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

