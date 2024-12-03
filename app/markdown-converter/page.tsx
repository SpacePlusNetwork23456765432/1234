'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown')
    if (savedMarkdown) {
      setMarkdown(savedMarkdown)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('markdown', markdown)
  }, [markdown])

  const downloadHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Markdown</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #2c3e50; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ccc; margin: 0; padding-left: 16px; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    ${ReactMarkdown({ children: markdown })}
</body>
</html>
  `
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'converted-markdown.html'
  a.click()
}

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Markdown to HTML Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Markdown Input</h2>
          <textarea
            className="w-full h-[calc(100vh-200px)] p-2 border rounded"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter your Markdown here..."
          />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">HTML Preview</h2>
          <div className="w-full h-[calc(100vh-200px)] p-4 border rounded overflow-auto bg-white">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
      <Button onClick={downloadHTML} className="mt-4">Download HTML</Button>
    </div>
  )
}

