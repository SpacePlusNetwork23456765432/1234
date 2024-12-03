'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const unitTypes = [
  { name: 'Length', units: ['Meters', 'Feet', 'Inches', 'Centimeters'] },
  { name: 'Weight', units: ['Kilograms', 'Pounds', 'Ounces', 'Grams'] },
  { name: 'Temperature', units: ['Celsius', 'Fahrenheit', 'Kelvin'] },
]

const conversionFactors: { [key: string]: { [key: string]: number } } = {
  Meters: { Feet: 3.28084, Inches: 39.3701, Centimeters: 100 },
  Kilograms: { Pounds: 2.20462, Ounces: 35.274, Grams: 1000 },
}

export default function UnitConverter() {
  const [unitType, setUnitType] = useState(unitTypes[0].name)
  const [fromUnit, setFromUnit] = useState(unitTypes[0].units[0])
  const [toUnit, setToUnit] = useState(unitTypes[0].units[1])
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  const handleConvert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue('')
      return
    }

    if (unitType === 'Temperature') {
      setToValue(convertTemperature(value, fromUnit, toUnit).toFixed(2))
    } else {
      const factor = conversionFactors[fromUnit]?.[toUnit]
      if (factor) {
        setToValue((value * factor).toFixed(2))
      } else {
        setToValue((value / conversionFactors[toUnit][fromUnit]).toFixed(2))
      }
    }
  }

  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value
    if (from === 'Celsius') {
      if (to === 'Fahrenheit') return (value * 9/5) + 32
      if (to === 'Kelvin') return value + 273.15
    }
    if (from === 'Fahrenheit') {
      if (to === 'Celsius') return (value - 32) * 5/9
      if (to === 'Kelvin') return (value - 32) * 5/9 + 273.15
    }
    if (from === 'Kelvin') {
      if (to === 'Celsius') return value - 273.15
      if (to === 'Fahrenheit') return (value - 273.15) * 9/5 + 32
    }
    return value
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Unit Converter</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="unitType">Unit Type</Label>
          <Select onValueChange={setUnitType} defaultValue={unitType}>
            <SelectTrigger id="unitType">
              <SelectValue placeholder="Select unit type" />
            </SelectTrigger>
            <SelectContent>
              {unitTypes.map((type) => (
                <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fromUnit">From</Label>
          <Select onValueChange={setFromUnit} defaultValue={fromUnit}>
            <SelectTrigger id="fromUnit">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {unitTypes.find(type => type.name === unitType)?.units.map((unit) => (
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
              {unitTypes.find(type => type.name === unitType)?.units.map((unit) => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fromValue">Value</Label>
          <Input
            id="fromValue"
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            placeholder="Enter value to convert"
          />
        </div>
        <Button onClick={handleConvert}>Convert</Button>
        {toValue && (
          <div>
            <Label htmlFor="toValue">Result</Label>
            <Input id="toValue" value={toValue} readOnly />
          </div>
        )}
      </div>
    </div>
  )
}

