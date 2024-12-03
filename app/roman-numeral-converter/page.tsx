'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function RomanNumeralConverter() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState('')

  const romanToArabic = (roman: string) => {
    const romanValues: { [key: string]: number } = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    }
    let result = 0
    for (let i = 0; i < roman.length; i++) {
      const current = romanValues[roman[i]]
      const next = romanValues[roman[i + 1]]
      if (next && current < next) {
        result -= current
      } else {
        result += current
      }
    }
    return result
  }

  const arabicToRoman = (num: number) => {
    const romanNumerals = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ]
    let result = ''
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral
        num -= value
      }
    }
    return result
  }

  const convertNumber = () => {
    if (/^[IVXLCDM]+$/.test(number.toUpperCase())) {
      setResult(romanToArabic(number.toUpperCase()).toString())
    } else if (/^\d+$/.test(number)) {
      setResult(arabicToRoman(parseInt(number)))
    } else {
      setResult('Invalid input')
    }
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Roman Numeral Converter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Convert Roman/Arabic Numerals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="number">Enter Roman Numeral or Arabic Number</Label>
              <Input
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g., XIV or 14"
              />
            </div>
            <Button onClick={convertNumber}>Convert</Button>
            {result && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <p>Result: {result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

