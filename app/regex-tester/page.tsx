'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function RegexTester() {
  const [regex, setRegex] = useState('')
  const [flags, setFlags] = useState('')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState<string[]>([])

  const testRegex = () => {
    try {
      const re = new RegExp(regex, flags)
      const newMatches = testString.match(re) || []
      setMatches(newMatches)
    } catch (error) {
      console.error('Invalid regex:', error)
      setMatches([])
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Regex Tester</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="regex">Regular Expression</Label>
          <Input
            id="regex"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter your regex here"
          />
        </div>
        <div>
          <Label htmlFor="flags">Flags</Label>
          <Input
            id="flags"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m, etc."
          />
        </div>
        <div>
          <Label htmlFor="testString">Test String</Label>
          <Textarea
            id="testString"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter your test string here"
            rows={5}
          />
        </div>
        <Button onClick={testRegex}>Test Regex</Button>
        {matches.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Matches</h2>
            <ul className="list-disc pl-5">
              {matches.map((match, index) => (
                <li key={index}>{match}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

