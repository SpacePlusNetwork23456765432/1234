'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function WordCounter() {
  const [text, setText] = useState('')

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const characterCount = text.length
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length
  const paragraphCount = text.split(/\n+/).filter(Boolean).length

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Word Counter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                rows={10}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Word Count:</p>
                <p>{wordCount}</p>
              </div>
              <div>
                <p className="font-semibold">Character Count:</p>
                <p>{characterCount}</p>
              </div>
              <div>
                <p className="font-semibold">Sentence Count:</p>
                <p>{sentenceCount}</p>
              </div>
              <div>
                <p className="font-semibold">Paragraph Count:</p>
                <p>{paragraphCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

