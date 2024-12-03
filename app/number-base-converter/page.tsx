'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NumberBaseConverter() {
  const [inputNumber, setInputNumber] = useState('')
  const [inputBase, setInputBase] = useState('10')
  const [outputBase, setOutputBase] = useState('2')
  const [result, setResult] = useState('')

  const convertNumber = () => {
    try {
      const decimal = parseInt(inputNumber, parseInt(inputBase))
      const converted = decimal.toString(parseInt(outputBase))
      setResult(converted.toUpperCase())
    } catch (error) {
      setResult('Invalid input')
    }
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Number Base Converter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Convert Number Base</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="inputNumber">Number to Convert</Label>
              <Input
                id="inputNumber"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="Enter number"
              />
            </div>
            <div>
              <Label htmlFor="inputBase">From Base</Label>
              <Select onValueChange={setInputBase} defaultValue={inputBase}>
                <SelectTrigger id="inputBase">
                  <SelectValue placeholder="Select input base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Binary (2)</SelectItem>
                  <SelectItem value="8">Octal (8)</SelectItem>
                  <SelectItem value="10">Decimal (10)</SelectItem>
                  <SelectItem value="16">Hexadecimal (16)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="outputBase">To Base</Label>
              <Select onValueChange={setOutputBase} defaultValue={outputBase}>
                <SelectTrigger id="outputBase">
                  <SelectValue placeholder="Select output base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Binary (2)</SelectItem>
                  <SelectItem value="8">Octal (8)</SelectItem>
                  <SelectItem value="10">Decimal (10)</SelectItem>
                  <SelectItem value="16">Hexadecimal (16)</SelectItem>
                </SelectContent>
              </Select>
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

