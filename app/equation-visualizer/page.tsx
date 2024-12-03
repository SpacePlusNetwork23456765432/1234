'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import * as math from 'mathjs'

export default function EquationVisualizer() {
  const [equation, setEquation] = useState('x^2')
  const [range, setRange] = useState({ min: -10, max: 10 })
  const [data, setData] = useState([])
  const [equationType, setEquationType] = useState('polynomial')

  useEffect(() => {
    generateData()
  }, [equation, range, equationType])

  const generateData = () => {
    try {
      const compiledEquation = math.compile(equation)
      const step = (range.max - range.min) / 100
      const newData = []

      for (let x = range.min; x <= range.max; x += step) {
        const y = compiledEquation.evaluate({ x: x })
        newData.push({ x, y })
      }

      setData(newData)
    } catch (error) {
      console.error('Error generating data:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Math Equation Visualizer</h1>
      <div className="mb-4 grid gap-2">
        <Select onValueChange={setEquationType} defaultValue={equationType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select equation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="polynomial">Polynomial</SelectItem>
            <SelectItem value="trigonometric">Trigonometric</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="Enter equation (e.g., x^2 or sin(x))"
        />
        <div className="flex space-x-2">
          <Input
            type="number"
            value={range.min}
            onChange={(e) => setRange({ ...range, min: parseFloat(e.target.value) })}
            placeholder="Min X"
          />
          <Input
            type="number"
            value={range.max}
            onChange={(e) => setRange({ ...range, max: parseFloat(e.target.value) })}
            placeholder="Max X"
          />
        </div>
        <Button onClick={generateData}>Visualize</Button>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

