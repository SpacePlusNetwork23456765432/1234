'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const timezones = [
  'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris',
  'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland'
]

export default function TimezoneConverter() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [fromTimezone, setFromTimezone] = useState('UTC')
  const [toTimezone, setToTimezone] = useState('America/New_York')
  const [result, setResult] = useState('')

  const convertTime = () => {
    if (!date || !time) {
      setResult('Please enter both date and time')
      return
    }

    try {
      const dateTime = new Date(`${date}T${time}:00`)
      const utcDate = new Date(dateTime.toLocaleString('en-US', { timeZone: fromTimezone }))
      const convertedDate = new Date(utcDate.toLocaleString('en-US', { timeZone: toTimezone }))

      setResult(`${convertedDate.toLocaleString('en-US', { timeZone: toTimezone })}`)
    } catch (error) {
      setResult('Invalid date or time')
    }
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Timezone Converter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Convert Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fromTimezone">From Timezone</Label>
              <Select onValueChange={setFromTimezone} defaultValue={fromTimezone}>
                <SelectTrigger id="fromTimezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toTimezone">To Timezone</Label>
              <Select onValueChange={setToTimezone} defaultValue={toTimezone}>
                <SelectTrigger id="toTimezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={convertTime}>Convert</Button>
            {result && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <p>{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

