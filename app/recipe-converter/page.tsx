'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const conversionFactors: { [key: string]: number } = {
  cups: 1,
  tablespoons: 16,
  teaspoons: 48,
  milliliters: 236.588,
  liters: 0.236588,
  ounces: 8,
  grams: 236.588,
}

export default function RecipeConverter() {
  const [amount, setAmount] = useState('')
  const [fromUnit, setFromUnit] = useState('cups')
  const [toUnit, setToUnit] = useState('tablespoons')
  const [result, setResult] = useState('')

  const convertRecipe = () => {
    const inputAmount = parseFloat(amount)
    if (isNaN(inputAmount)) {
      setResult('Please enter a valid number')
      return
    }

    const baseAmount = inputAmount / conversionFactors[fromUnit]
    const convertedAmount = baseAmount * conversionFactors[toUnit]
    setResult(`${inputAmount} ${fromUnit} = ${convertedAmount.toFixed(2)} ${toUnit}`)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Recipe Converter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Convert Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              <Label htmlFor="fromUnit">From</Label>
              <Select onValueChange={setFromUnit} defaultValue={fromUnit}>
                <SelectTrigger id="fromUnit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionFactors).map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toUnit">To</Label>
              <Select onValueChange={setToUnit} defaultValue={toUnit}>
                <SelectTrigger id="toUnit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionFactors).map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={convertRecipe}>Convert</Button>
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

