'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function FlexboxPlayground() {
  const [flexDirection, setFlexDirection] = useState('row')
  const [justifyContent, setJustifyContent] = useState('flex-start')
  const [alignItems, setAlignItems] = useState('stretch')
  const [flexWrap, setFlexWrap] = useState('nowrap')
  const [numItems, setNumItems] = useState(3)

  const flexItems = Array.from({ length: numItems }, (_, i) => i + 1)

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">CSS Flexbox Playground</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Flexbox Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="flexDirection">Flex Direction</Label>
              <Select onValueChange={setFlexDirection} defaultValue={flexDirection}>
                <SelectTrigger id="flexDirection">
                  <SelectValue placeholder="Select flex direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">row</SelectItem>
                  <SelectItem value="row-reverse">row-reverse</SelectItem>
                  <SelectItem value="column">column</SelectItem>
                  <SelectItem value="column-reverse">column-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="justifyContent">Justify Content</Label>
              <Select onValueChange={setJustifyContent} defaultValue={justifyContent}>
                <SelectTrigger id="justifyContent">
                  <SelectValue placeholder="Select justify content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="space-between">space-between</SelectItem>
                  <SelectItem value="space-around">space-around</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alignItems">Align Items</Label>
              <Select onValueChange={setAlignItems} defaultValue={alignItems}>
                <SelectTrigger id="alignItems">
                  <SelectValue placeholder="Select align items" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="stretch">stretch</SelectItem>
                  <SelectItem value="baseline">baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="flexWrap">Flex Wrap</Label>
              <Select onValueChange={setFlexWrap} defaultValue={flexWrap}>
                <SelectTrigger id="flexWrap">
                  <SelectValue placeholder="Select flex wrap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowrap">nowrap</SelectItem>
                  <SelectItem value="wrap">wrap</SelectItem>
                  <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numItems">Number of Items</Label>
              <Input
                id="numItems"
                type="number"
                value={numItems}
                onChange={(e) => setNumItems(parseInt(e.target.value))}
                min="1"
                max="10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Flexbox Container</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-gray-300 p-4 min-h-[200px]"
            style={{
              display: 'flex',
              flexDirection: flexDirection as any,
              justifyContent,
              alignItems,
              flexWrap: flexWrap as any,
            }}
          >
            {flexItems.map((item) => (
              <div
                key={item}
                className="bg-blue-500 text-white font-bold p-4 m-2 text-center"
                style={{ minWidth: '60px', minHeight: '60px' }}
              >
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

