'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError('Invalid JSON')
      setOutput('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">JSON Formatter</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="input">Input JSON</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here"
            rows={10}
          />
        </div>
        <Button onClick={formatJSON}>Format JSON</Button>
        {error && <p className="text-red-500">{error}</p>}
        {output && (
          <div>
            <Label htmlFor="output">Formatted JSON</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              rows={10}
            />
          </div>
        )}
      </div>
    </div>
  )
}

