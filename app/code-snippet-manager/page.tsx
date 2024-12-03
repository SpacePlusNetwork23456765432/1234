'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

export default function CodeSnippetManager() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    const savedSnippets = localStorage.getItem('codeSnippets')
    if (savedSnippets) {
      setSnippets(JSON.parse(savedSnippets))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('codeSnippets', JSON.stringify(snippets))
  }, [snippets])

  const addSnippet = () => {
    if (title && language && code) {
      const newSnippet: Snippet = {
        id: Date.now().toString(),
        title,
        language,
        code,
      }
      setSnippets([...snippets, newSnippet])
      setTitle('')
      setLanguage('')
      setCode('')
    }
  }

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Code Snippet Manager</h1>
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Snippet title"
          />
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Programming language"
          />
        </div>
        <div>
          <Label htmlFor="code">Code</Label>
          <Textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here"
            rows={5}
          />
        </div>
        <Button onClick={addSnippet}>Add Snippet</Button>
      </div>
      <div className="space-y-4">
        {snippets.map((snippet) => (
          <Card key={snippet.id}>
            <CardHeader>
              <CardTitle>{snippet.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">Language: {snippet.language}</p>
              <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                <code>{snippet.code}</code>
              </pre>
              <Button variant="destructive" onClick={() => deleteSnippet(snippet.id)} className="mt-2">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

